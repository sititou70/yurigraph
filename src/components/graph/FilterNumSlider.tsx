import styled from '@emotion/styled';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { FC } from 'react';
import theme from '../../styles/theme';

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
        ValueLabelComponent={({ children, open, value }) => (
          <Tooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
          >
            {children}
          </Tooltip>
        )}
        valueLabelFormat={(x) => `${x}作品以上`}
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
