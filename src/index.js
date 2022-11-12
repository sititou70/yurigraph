import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { muiTheme } from './theme';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
