import { Global, ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { global_style } from '../styles/GlobalStyle';
import { muiTheme } from '../styles/theme';
import CouplingRanking from './CouplingRanking';
import GraphRoot from './graph';
import Menu from './Menu';

// components
export const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-158683797-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <Global styles={global_style} />
      <GraphRoot />
      <CouplingRanking />
      <Menu />
    </div>
  );
};

export default App;
