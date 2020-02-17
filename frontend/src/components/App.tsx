import React from 'react';
import DereGraph from './graph/DereGraph';
import { Global } from '@emotion/core';
import { global_style } from '../styles/GlobalStyle';
import Menu from './Menu';
import CouplingRanking from './CouplingRanking';

// components
export const App = () => (
  <div>
    <Global styles={global_style} />
    <DereGraph />
    <CouplingRanking />
    <Menu />
  </div>
);

export default App;
