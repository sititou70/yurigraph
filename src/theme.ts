import { createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: pink[600],
    },
  },
});

export const makePxScaleUtil =
  (base: number) =>
  (scale: number = 1): string =>
    `${base * scale}px`;

const base_color = process.env.REACT_APP_BASE_COLOR;
const main_color = process.env.REACT_APP_MAIN_COLOR;
const accent_color = process.env.REACT_APP_ACCENT_COLOR;

export const colors = {
  base: base_color ? base_color : '#f8f8f8',
  main: main_color ? main_color : '#00a8cc',
  accent: accent_color ? accent_color : '#fe346e',
  border: '#ddd',
  text: '#123',
};
export const px = {
  grid: makePxScaleUtil(20),
  font_size: makePxScaleUtil(16),
  max_width: makePxScaleUtil(900),
  border_radius: makePxScaleUtil(3),
};

export const theme = { colors, px };

export default theme;
