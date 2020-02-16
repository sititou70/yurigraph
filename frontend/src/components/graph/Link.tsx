import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LinkData } from './types';
import styled from '@emotion/styled';

export const Link: FC<{ data: LinkData }> = ({ data }) => {
  const line = useRef(null);
  useEffect(() => {
    if (line.current === null) return;
    d3.select(line.current).datum(data);
  });

  return <StyledLine className="link" ref={line} />;
};
const StyledLine = styled.line`
  stroke-width: 3px;
  stroke: #000;
`;

export default Link;
