import { css } from '@emotion/react';
import { useWindowSize } from '@react-hook/window-size';
import * as d3 from 'd3';
import mixColor from 'mix-color';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { resolver_enable } from '../Resolver/recoil';
import theme from '../theme';
import {
  getSimuration,
  getSimurationForResolvedGraph,
} from './forceSimuration';
import { Link, linkTickHandler } from './Link';
import { Node, nodeTickHandler } from './Node';
import { graph_d3graph, graph_sigmoid } from './recoil';
import { D3Graph } from './types';
import { getLinkDetail, getNodeDetail } from './utils';

const deepCopy = require('deep-copy');

export const Graph: FC = () => {
  const _d3graph = useRecoilValue(graph_d3graph);
  const d3graph = useMemo(() => deepCopy(_d3graph) as D3Graph, [_d3graph]);

  const sigmoid = useRecoilValue(graph_sigmoid);
  const [width, height] = useWindowSize();
  const resolve_mode = useRecoilValue(resolver_enable);
  const simuration = useMemo(
    () =>
      (!resolve_mode ? getSimuration : getSimurationForResolvedGraph)(d3graph, {
        window_size: { width, height },
        sigmoid,
      }),
    [d3graph, sigmoid, width, height, resolve_mode]
  );

  const svg_ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (svg_ref.current === null) return;

    const root = d3.select(svg_ref.current);
    simuration.on('tick', () => {
      root.call((selection) => {
        nodeTickHandler(selection);
        linkTickHandler(selection);
      });
    });
  }, [simuration]);

  const graph_position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const root_group = useRef<SVGGElement | null>(null);
  const setupMoveHandler = (svg: Element | null) => {
    if (svg === null) return;
    d3.select(svg as Element).call(
      d3
        .drag()
        .subject(() => {
          if (root_group.current === null) return;
          return { x: graph_position.current.x, y: graph_position.current.y };
        })
        .on('drag', (event: any) => {
          if (root_group.current === null) return;
          root_group.current.style.transform = `translate(${event.x}px, ${event.y}px)`;
          graph_position.current = { x: event.x, y: event.y };
        })
    );
  };

  // render
  const link_components = d3graph.links.map((link) => {
    const detail = getLinkDetail(link.link_id);
    if (detail === undefined) return null;

    return <Link link={link} detail={detail} key={link.index} />;
  });
  const node_components = d3graph.nodes.map((node) => {
    const detail = getNodeDetail(node.node_id);
    if (detail === undefined) return null;

    return (
      <Node
        node={node}
        detail={detail}
        simuration={simuration}
        key={node.index}
      />
    );
  });

  return (
    <svg
      css={css`
        display: block;
        width: 100%;
        height: 100vh;
        background: linear-gradient(
          0.1turn,
          ${mixColor('#fff', theme.colors.main, 0.1)} 30%,
          ${mixColor('#fff', theme.colors.accent, 0.1)}
        );
        &:active {
          cursor: move;
        }
      `}
      ref={(svg) => {
        svg_ref.current = svg;
        setupMoveHandler(svg);
      }}
    >
      <g ref={root_group}>
        {link_components}
        {node_components}
      </g>
    </svg>
  );
};

export default Graph;
