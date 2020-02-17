import 'normalize.css';
import { css } from '@emotion/core';
import Typography from 'typography';
const githubTheme = require('typography-theme-github');

const typography = new Typography(githubTheme);

typography.injectStyles();

export const global_style = css`
  * {
    line-height: 1.7;
  }

  a {
    color: #c6255a;
  }

  a:visited {
    color: #5b001e;
  }
`;
