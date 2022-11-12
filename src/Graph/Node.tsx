import { css } from '@emotion/react';
import * as d3 from 'd3';
import { Simulation } from 'd3';
import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  character_dialog_name,
  character_dialog_open,
} from '../CharacterDialog/recoil';
import theme from '../theme';
import { graph_activated_nodes, graph_focused_node } from './recoil';
import { D3Link, D3Node } from './types';
import { NodeDetail } from './utils';

const ROOT_CLASS_NAME = 'node';

export const Node: FC<{
  node: D3Node;
  detail: NodeDetail;
  simuration: Simulation<D3Node, D3Link>;
}> = ({ node, detail, simuration }) => {
  const setFocusedNode = useSetRecoilState(graph_focused_node);
  const activated_nodes = useRecoilValue(graph_activated_nodes);
  const active = activated_nodes === null || activated_nodes?.has(node.node_id);

  const setCharacterDialogOpen = useSetRecoilState(character_dialog_open);
  const setCharacterDialogName = useSetRecoilState(character_dialog_name);

  const registerNode = (element: Element | null) => {
    if (element === null) return;
    const root = d3.select(element);
    root.datum(node);
  };

  const setupDragHandler = (element: Element | null) => {
    if (element === null) return;

    d3.select(element).call(
      d3
        .drag()
        .on('start', (_, d: any) => {
          simuration.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (_, d: any) => {
          simuration.alphaTarget(0).restart();
          d.fx = null;
          d.fy = null;
        })
    );
  };

  return (
    <g
      className={ROOT_CLASS_NAME}
      css={css`
        cursor: pointer;
        &:active {
          cursor: move;
        }
        &:hover {
          circle {
            fill: ${theme.colors.accent};
          }
        }
      `}
      onMouseEnter={() => {
        setFocusedNode(node.node_id);
      }}
      onMouseLeave={() => {
        setFocusedNode(null);
      }}
      onClick={() => {
        setCharacterDialogOpen(true);
        setCharacterDialogName(detail.name);
      }}
      ref={(g) => {
        registerNode(g);
        setupDragHandler(g);
      }}
    >
      <circle
        r={14}
        css={css`
          fill: #fff;
          stroke: #0001;
          stroke-width: 7px;
          opacity: ${active ? 1 : 0};
          transition: opacity ease 0.3s, fill ease 0.3s;
        `}
      />
      <text
        y={6}
        css={css`
          fill: ${theme.colors.text}c;
          stroke: #fff7;
          stroke-width: 7px;
          paint-order: stroke;
          font-size: ${theme.px.font_size()};
          font-family: sans;
          stroke-linejoin: round;
          opacity: ${active ? 1 : 0.3};
          transition: opacity ease 0.3s;
        `}
      >
        {detail.name.replace(/\(.*\)/, '')}
      </text>
    </g>
  );
};

export const nodeTickHandler = (
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  selection
    .selectAll(`.${ROOT_CLASS_NAME}`)
    .call((selection) =>
      (
        selection as unknown as d3.Selection<
          SVGCircleElement,
          D3Node,
          SVGSVGElement,
          unknown
        >
      ).attr('transform', (node) => `translate(${node.x}, ${node.y})`)
    );
};
