import styled from '@emotion/styled';
import { Slider } from '@mui/material';
import { FC, useCallback } from 'react';
import theme from '../../styles/theme';

// components
export const FilterNumSlider: FC<{
  default_value: number;
  step: number;
  min: number;
  max: number;
  onChange: (num: number) => void;
}> = ({ default_value, step, min, max, onChange }) => {
  const getLabelText = useCallback((x) => `${x}作品以上`, []);
  return (
    <SliderRoot>
      <Slider
        defaultValue={default_value}
        step={step}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        getAriaValueText={getLabelText}
        valueLabelFormat={getLabelText}
        onChangeCommitted={(_, v) => typeof v === 'number' && onChange(v)}
        marks
      />
    </SliderRoot>
  );
};
const SliderRoot = styled.div`
  position: absolute;
  right: ${theme.px.grid()};
  bottom: 0;
  width: calc(100vw - ${theme.px.grid(1.5)} * 2);
  max-width: ${theme.px.grid(20)};
`;

export default FilterNumSlider;
