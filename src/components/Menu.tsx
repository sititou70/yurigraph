import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import GitHubIcon from '../assets/GitHub-Mark-32px.png';
import RankingIcon from '../assets/ranking.png';
import theme from '../styles/theme';

// components
export const Menu = () => (
  <Root>
    <Typography display="inline" variant="h1">
      {process.env.REACT_APP_APP_NAME}
    </Typography>
    <a href="#カップリングランキング">
      <img src={RankingIcon} alt="カップリングランキング" />
    </a>
    <a
      href="https://github.com/sititou70/yurigraph"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={GitHubIcon} alt="yurigraphのGitHubリポジトリ" />
    </a>
  </Root>
);
const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  column-gap: ${theme.px.grid()};
  padding: ${theme.px.grid(0.5)} ${theme.px.grid()};
  background: ${theme.colors.base};
  box-shadow: 0 0 ${theme.px.grid()} #0002;
  border-radius: 0 ${theme.px.border_radius()} ${theme.px.border_radius()};

  h1 {
    font-size: 1rem;
  }

  img {
    display: block;
    margin: 0;
  }
`;

export default Menu;
