import styled from '@emotion/styled';
import SettingsIcon from '@mui/icons-material/Settings';
import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { FC } from 'react';
import theme from '../../styles/theme';

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
  bottom: ${theme.px.grid(3)};
  padding: 0 ${theme.px.grid(0.5)} 0 0;
  background: ${theme.colors.base};
  box-shadow: 0 0 ${theme.px.grid()} #0002;
  border-radius: ${theme.px.border_radius()} 0 0 ${theme.px.border_radius()};
  z-index: 1;

  label {
    margin: 0;
    padding: 0 ${theme.px.grid(0.5)} 0 0;
  }
`;

export default MakeCouplingSettings;
