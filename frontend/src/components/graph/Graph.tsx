import React, { FC, useEffect, useRef, useState, useMemo } from 'react';
import getInitializedForce from './forceSimulation';
import Node from './Node';
import Link from './Link';
import { NodeData, LinkData } from './types';
import { useWindowSize } from '@react-hook/window-size';
import styled from '@emotion/styled';
import stats from 'stats-lite';
import * as d3 from 'd3';
const makeSigmoid = require('awesome-sigmoid').default;

export const Graph: FC<{
  nodes: NodeData[];
  links: LinkData[];
  onNodeClick?: (name: string) => void;
}> = ({ nodes, links, onNodeClick }) => {
  //setup sigmoid
  const nums = links.map(x => x.num);
  const sigmoid = makeSigmoid({
    center: stats.mean(nums),
    deviation: stats.stdev(nums),
    deviation_output: 0.9,
  });

  //setup force simulation
  const [width, height] = useWindowSize();
  const force = useMemo(
    () =>
      getInitializedForce(nodes, links, {
        classname: { node: 'node', link: 'link' },
        window_size: { width, height },
        link_distance: { weight: 5000, margin: 100 },
      }),
    [nodes, links, width, height]
  );
  const svg = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (svg.current === null) return;
    force.registerGraph(svg.current);
  });

  //move and zoom handler
  const graph_position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const root_group = useRef<SVGGElement | null>(null);
  useEffect(() => {
    if (svg.current === null) return;
    d3.select(svg.current as Element).call(
      d3
        .drag()
        .subject(() => {
          if (root_group.current === null) return;
          return { x: graph_position.current.x, y: graph_position.current.y };
        })
        .on('drag', (d: any) => {
          if (root_group.current === null) return;
          root_group.current.style.transform = `translate(${d3.event.x}px, ${d3.event.y}px)`;
          graph_position.current = { x: d3.event.x, y: d3.event.y };
        })
    );
  }, []);

  //focus node
  const [focus_name, setFocusName] = useState<string | null>(null);
  const friends: { [name: string]: string[] } = nodes
    .map(x => x.name)
    .map(x => ({
      [x]: links
        .map(y =>
          y.source_name === x
            ? y.target_name
            : y.target_name === x
            ? y.source_name
            : null
        )
        .filter<string>((x): x is string => typeof x === 'string'),
    }))
    .reduce((s, x) => ({ ...s, ...x }));

  //components
  const link_components = links.map(x => {
    const detail = x.source_name === focus_name || x.target_name === focus_name;
    return (
      <Link
        data={x}
        weight={sigmoid(x.num)}
        active={focus_name === null || detail}
        detail={detail}
        key={x.name}
      />
    );
  });

  const node_components = nodes.map(x => (
    <Node
      data={x}
      force_simulation={force.force_simulation}
      active={
        focus_name === null ||
        focus_name === x.name ||
        friends[focus_name].indexOf(x.name) !== -1
      }
      onFocusName={setFocusName}
      onClick={onNodeClick}
      key={x.name}
    />
  ));

  return (
    <GraphRoot ref={svg}>
      <g ref={root_group}>
        {link_components}
        {node_components}
      </g>
    </GraphRoot>
  );
};
const GraphRoot = styled.svg`
  display: block;
  width: 100%;
  height: 100vh;
  cursor: all-scroll;

  * {
    transition: fill ease 0.5s, opacity ease 0.5s;
  }
`;

export default Graph;
