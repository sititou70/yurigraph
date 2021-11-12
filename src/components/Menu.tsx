import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import theme from '../styles/theme';

// components
export const Menu = () => (
  <Root>
    <div>
      <Typography display="inline" variant="h1">
        {process.env.REACT_APP_NAME}{' '}
      </Typography>
      <a
        href="https://github.com/sititou70/yurigraph"
        target="_blank"
        rel="noopener noreferrer"
      >
        リポジトリ
      </a>
    </div>
    <a href="#カップリングランキング">カップリングランキング</a>
    <div>
      author:
      <a
        href="https://twitter.com/sititou70"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sititou70
      </a>
    </div>
    update: {process.env['REACT_APP_BUILD_DATE']}
  </Root>
);
const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${theme.px.grid(0.5)};
  background: ${theme.colors.base};
  font-size: 0.8rem;
  box-shadow: 0 0 ${theme.px.grid()} #0002;
  border-radius: 0 ${theme.px.border_radius()} ${theme.px.border_radius()};

  h1 {
    font-size: 1rem;
  }

  div {
    a {
      margin-left: ${theme.px.grid(0.5)};
    }
  }
`;

export default Menu;
