import React from 'react';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';

// components
export const Menu = () => (
  <Root>
    <Typography display="block" variant="h1">
      DereGraph
    </Typography>
    <a href="#カップリングランキング">カップリングランキング</a>
    <div>
      authers
      <a
        href="https://twitter.com/sititou70"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sititou70
      </a>
      <a
        href="https://twitter.com/_leo_isaac"
        target="_blank"
        rel="noopener noreferrer"
      >
        @_leo_isaac
      </a>
    </div>
  </Root>
);
const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 12px;

  h1 {
    font-size: 16px;
  }

  div {
    a {
      margin-left: 10px;
    }
  }
`;

export default Menu;
