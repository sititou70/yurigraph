import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeData, ForceSimulation } from './types';
import styled from '@emotion/styled';

export const Node: FC<{
  data: NodeData;
  force_simulation: ForceSimulation;
  onHoverInfo?: (info: Element) => void;
}> = ({ data, force_simulation }) => {
  const root_element = useRef<SVGCircleElement | null>(null);

  //append d3 data
  useEffect(() => {
    if (root_element.current === null) return;
    d3.select(root_element.current).datum(data);
  });

  //drag event
  useEffect(() => {
    if (root_element.current === null) return;
    d3.select(root_element.current as Element).call(
      d3
        .drag()
        .on('start', (d: any) => {
          force_simulation.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (d: any) => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on('end', (d: any) => {
          d.fx = null;
          d.fy = null;
        })
    );
  }, []);

  return (
    <g className="node" ref={root_element}>
      <StyledCircle r={15} />
      <StyledText>{data.name}</StyledText>
    </g>
  );
};
const StyledCircle = styled.circle`
  fill: red;
`;
const StyledText = styled.text``;

export default Node;
