import 'normalize.css';
import { css } from '@emotion/core';
import Typography from 'typography';
import theme from './theme';
import mixColor from 'mix-color';
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
      color: ${mixColor(theme.colors.accent, '#000', 0.2)};
      &:visited {
        color: ${mixColor(theme.colors.accent, '#000', 0.5)};
      }
    }
  }
`;
