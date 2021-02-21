import React, { useEffect } from 'react';
import GraphRoot from './graph';
import { Global } from '@emotion/react';
import { global_style } from '../styles/GlobalStyle';
import Menu from './Menu';
import CouplingRanking from './CouplingRanking';
import ReactGA from 'react-ga';

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
