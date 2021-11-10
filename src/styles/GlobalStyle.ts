import { css } from '@emotion/react';
import 'normalize.css';
import Typography from 'typography';
import theme from './theme';
const typographyTheme = require('typography-theme-github');

const typography = new Typography(typographyTheme);

typography.injectStyles();

export const global_style = css`
  body {
    color: ${theme.colors.text};
    font-size: ${theme.px.font_size()};
    background: ${theme.colors.base};
    line-height: 1.7;

    a {
      color: #c6255a;

      &:visited {
        color: #5b001e;
      }
    }
  }
`;
