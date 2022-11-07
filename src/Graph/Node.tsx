import { css } from '@emotion/react';
import * as d3 from 'd3';
import { Simulation } from 'd3';
import { FC, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  character_dialog_name,
  character_dialog_open,
} from '../CharacterDialog/recoil';
import theme from '../theme';
import { NODE_ELEMENT_CLASSNAME } from './consts';
import { graph_activated_nodes, graph_focused_node } from './recoil';
import { D3Link, D3Node } from './types';
import { NodeDetail } from './utils';

export const Node: FC<{
  node: D3Node;
  detail: NodeDetail;
  force_simulation: Simulation<D3Node, D3Link>;
}> = ({ node, detail, force_simulation }) => {
  const setFocusedNode = useSetRecoilState(graph_focused_node);
  const activated_nodes = useRecoilValue(graph_activated_nodes);
  const active = activated_nodes === null || activated_nodes?.has(node.node_id);

  const setCharacterDialogOpen = useSetRecoilState(character_dialog_open);
  const setCharacterDialogName = useSetRecoilState(character_dialog_name);

  const root_element = useRef<SVGCircleElement | null>(null);

  // drag handler
  useEffect(() => {
    if (root_element.current === null) return;
    d3.select(root_element.current as Element).call(
      d3
        .drag()
        .on('start', (_, d: any) => {
          force_simulation.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (_, d: any) => {
          force_simulation.alphaTarget(0).restart();
          d.fx = null;
          d.fy = null;
        })
    );
  });

  useEffect(() => {
    if (root_element.current === null) return;
    const root = d3.select(root_element.current);
    root.datum(node);
    return () => {
      root.datum();
    };
  });

  return (
    <g
      className={NODE_ELEMENT_CLASSNAME}
      css={css`
        opacity: ${active ? 1 : 0.3};
        cursor: grab;
        &:active {
          cursor: grabbing;
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
      ref={root_element}
    >
      <circle
        r={14}
        css={css`
          fill: #fff;
          stroke: #0001;
          stroke-width: 7px;
          opacity: ${active ? 1 : 0};
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
        `}
      >
        {detail.name.replace(/\(.*\)/, '')}
      </text>
    </g>
  );
};

export default Node;
