export const makePxScaleUtil = (base: number) => (scale: number = 1): string =>
  `${base * scale}px`;

export const colors = {
  base: '#f8f8f8',
  main: '#00a8cc',
  accent: '#fe346e',
  border: '#ccc',
  text: '#123',
};
export const px = {
  grid: makePxScaleUtil(20),
  font_size: makePxScaleUtil(16),
  max_width: makePxScaleUtil(900),
};

export default { colors, px };
