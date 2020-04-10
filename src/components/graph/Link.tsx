import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LinkData } from './types';
import styled from '@emotion/styled';
import mixColor from 'mix-color';

export const Link: FC<{
  data: LinkData;
  weight: number;
  active: boolean;
  detail: boolean;
}> = ({ data, weight, active, detail }) => {
  const line = useRef(null);
  useEffect(() => {
    if (line.current === null) return;
    const root = d3.select(line.current);
    root.datum(data);
    return () => {
      root.datum();
    };
  });

  const id = `deregraph-link-${data.id}`;

  return (
    <>
      <StyledPath
        id={id}
        className="link"
        weight={weight}
        active={active}
        ref={line}
      ></StyledPath>
      {detail ? (
        <StyledLabel>
          <textPath href={`#${id}`} startOffset="50%">
            {data.name}
          </textPath>
        </StyledLabel>
      ) : null}
    </>
  );
};
const StyledPath = styled.path<{ weight: number; active: boolean }>`
  stroke: ${(props) => mixColor('#eee', '#ff80aa', props.weight)};
  stroke-width: ${(props) => props.weight * 3 + 2}px;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
`;

const StyledLabel = styled.text`
  fill: #000;
  text-anchor: middle;
  font-size: 12px;
`;

export default Link;
