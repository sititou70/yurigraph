import React, { FC, useEffect, useRef, useState } from 'react';
import getInitializedForce from './forceSimulation';
import Node from './Node';
import Link from './Link';
import { NodeData, LinkData } from './types';
import { useWindowSize } from '@react-hook/window-size';
import styled from '@emotion/styled';

export const Graph: FC<{ nodes: NodeData[]; links: LinkData[] }> = ({
  nodes,
  links,
}) => {
  const [width, height] = useWindowSize();

  const [force, setForce] = useState(
    getInitializedForce(nodes, links, {
      classname: { node: 'node', link: 'link' },
      window_size: { width, height },
      link_distance: { weight: 5000, margin: 30 },
    })
  );

  const svg = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (svg.current === null) return;
    force.registerGraph(svg.current);
  });

  return (
    <GraphRoot ref={svg}>
      {links.map(x => (
        <Link data={x} key={x.id} />
      ))}
      {nodes.map(x => (
        <Node data={x} force_simulation={force.force_simulation} key={x.id} />
      ))}
    </GraphRoot>
  );
};
const GraphRoot = styled.svg`
  width: 100%;
  height: 100vh;
`;

export default Graph;
