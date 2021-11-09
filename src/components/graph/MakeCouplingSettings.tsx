import React, { FC } from 'react';
import styled from '@emotion/styled';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import theme from '../../styles/theme';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// components
export const MakeCouplingSettings: FC<{
  checked: boolean;
  onChange: (val: boolean) => void;
  onClickSettingButton: () => void;
}> = ({ checked, onChange, onClickSettingButton }) => {
  return (
    <Root>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            name="resolve_one_to_many"
          />
        }
        label="1対1に解決"
      />
      <IconButton
        disabled={!checked}
        aria-label="close"
        onClick={onClickSettingButton}
      >
        <SettingsIcon />
      </IconButton>
    </Root>
  );
};
const Root = styled.div`
  position: absolute;
  right: 0;
  bottom: ${theme.px.grid(2)};
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 ${theme.px.grid()} #0002;

  label {
    margin: 0;
    padding: 0 ${theme.px.grid()} 0 0;
  }
`;

export default MakeCouplingSettings;
