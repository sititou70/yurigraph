import { css, Global } from '@emotion/react';
import { Typography } from '@mui/material';
import 'normalize.css';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { CharacterDialog } from './CharacterDialog/CharacterDialog';
import { FilterSlider } from './FilterSlider/FilterSlider';
import Graph from './Graph/Graph';
import { Nav } from './Nav/Nav';
import { CouplingRanking } from './Ranking/CouplingRanking';
import { Resolver } from './Resolver/Resolver';
import theme from './theme';

const global_style = css`
  * {
    box-sizing: border-box;
  }

  body {
    color: ${theme.colors.text};
    font-size: ${theme.px.font_size()};
    font-family: serif;
    line-height: 2;
    background: ${theme.colors.base};

    a {
      color: #c6255a;

      &:visited {
        color: #5b001e;
      }
    }
  }
`;

export const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-158683797-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Global styles={global_style} />

      {/* graph */}
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100vh;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
          `}
        >
          <Nav />
        </div>

        <Graph />
        <CharacterDialog />

        <div
          css={css`
            position: absolute;
            right: 0;
            bottom: ${theme.px.grid(3.5)};
            max-width: 100%;
          `}
        >
          <Resolver />
        </div>

        <div
          css={css`
            position: absolute;
            right: 0;
            bottom: ${theme.px.grid(0.5)};
            width: 100%;
            max-width: 500px;
            padding: 0 ${theme.px.grid(2)};
          `}
        >
          <FilterSlider />
        </div>
      </div>

      {/* ranking */}
      <div
        css={css`
          box-shadow: 0 0 ${theme.px.grid()} #0002;
        `}
      >
        <div
          css={css`
            width: fit-content;
            margin: 0 auto;
            padding: ${theme.px.grid()};
          `}
        >
          <Typography
            id="カップリングランキング"
            component="h2"
            variant="h4"
            css={css`
              padding-top: ${theme.px.grid()};
            `}
          >
            カップリングランキング
          </Typography>
          <Typography component="p">
            更新: {process.env['REACT_APP_BUILD_DATE']}
          </Typography>
          <CouplingRanking />
        </div>
      </div>
    </>
  );
};
