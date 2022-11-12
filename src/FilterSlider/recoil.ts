import { atom } from 'recoil';

export const filter_slider_value = atom({
  key: 'filter_slider/value',
  default: parseInt(process.env.REACT_APP_DEFAULT_FILTER_VALUE as string),
});
