import { Slider } from '@mui/material';
import { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import stats from 'stats-lite';
import { couplings } from '../couplings';
import { filter_slider_value } from './recoil';

const nums = couplings
  .map((x) => x.tags.map((x) => x.num))
  .reduce((s, x) => [...s, ...x]);
const num_stats = {
  max: nums.reduce((s, x) => (s > x ? s : x)),
  min: nums.reduce((s, x) => (s < x ? s : x)),
  center: parseInt(process.env.REACT_APP_DEFAULT_FILTER_VALUE as string),
  stdev: stats.stdev(nums),
};

const step = Math.floor(num_stats.stdev / 10);
const min = 0;
const max = Math.floor(num_stats.center + num_stats.stdev);

export const FilterSlider: FC = () => {
  const [filter_num, setFilterNum] = useRecoilState(filter_slider_value);
  const getLabelText = useCallback((x: number) => `${x}作品以上`, []);

  return (
    <Slider
      defaultValue={filter_num}
      step={step}
      min={min}
      max={max}
      valueLabelDisplay="auto"
      getAriaValueText={getLabelText}
      valueLabelFormat={getLabelText}
      onChangeCommitted={(_, v) => typeof v === 'number' && setFilterNum(v)}
      marks
    />
  );
};
