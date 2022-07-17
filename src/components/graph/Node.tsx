import styled from '@emotion/styled';
import * as d3 from 'd3';
import { FC, useEffect, useRef } from 'react';
import theme from '../../styles/theme';
import { ForceSimulation, NodeData } from './types';

export const Node: FC<{
  data: NodeData;
  force_simulation: ForceSimulation;
  active: boolean;
  onClick?: (name: string) => void;
  onFocusName?: (name: string | null) => void;
}> = ({ data, force_simulation, active, onFocusName, onClick }) => {
  const root_element = useRef<SVGCircleElement | null>(null);

  //append d3 data
  useEffect(() => {
    if (root_element.current === null) return;
    const root = d3.select(root_element.current);
    root.datum(data);

    return () => {
      root.datum();
    };
  });

  //drag event
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

  return (
    <StyledRoot
      className="node"
      active={active}
      onMouseEnter={() => {
        onFocusName && onFocusName(data.name);
      }}
      onMouseLeave={() => {
        onFocusName && onFocusName(null);
      }}
      onClick={() => {
        onClick && onClick(data.name);
      }}
      ref={root_element}
    >
      <circle r={14} />
      <text y={6}>{data.name.replace(/\(.*\)/, '')}</text>
    </StyledRoot>
  );
};
const StyledRoot = styled.g<{ active: boolean }>`
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  cursor: grab;
  &:active {
    cursor: grabbing;
  }

  circle {
    fill: #fff;
    stroke: #0001;
    stroke-width: 7px;
    opacity: ${(props) => (props.active ? 1 : 0)};
  }

  text {
    fill: ${theme.colors.text}c;
    stroke: #fff7;
    stroke-width: 7px;
    paint-order: stroke;
    font-size: ${theme.px.font_size()};
    font-family: sans;
    stroke-linejoin: round;
  }

  &:hover {
    circle {
      fill: ${theme.colors.accent};
    }
  }
`;

export default Node;
