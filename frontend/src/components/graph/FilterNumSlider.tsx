import React, { FC } from 'react';
import styled from '@emotion/styled';
import Slider from '@material-ui/core/Slider';

// components
export const FilterNumSlider: FC<{
  default_value: number;
  step: number;
  min: number;
  max: number;
  onChange: (num: number) => void;
}> = ({ default_value, step, min, max, onChange }) => {
  return (
    <SliderRoot>
      <Slider
        defaultValue={default_value}
        aria-labelledby="filter-num-slider"
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        onChangeCommitted={(_, v) => typeof v === 'number' && onChange(v)}
        marks
      />
    </SliderRoot>
  );
};
const SliderRoot = styled.div`
  position: absolute;
  right: 30px;
  bottom: 0;
  width: 40vw;
  min-width: 350px;
`;

export default FilterNumSlider;
