import React, { FC } from 'react';
import styled from '@emotion/styled';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import theme from '../../styles/theme';

// components
export const MakeCouplingCheckbox: FC<{
  checked: boolean;
  onChange: (val: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <CheckboxRoot>
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
    </CheckboxRoot>
  );
};
const CheckboxRoot = styled.div`
  position: absolute;
  right: 0;
  bottom: ${theme.px.grid(2)};
  background: rgba(255, 255, 255, 0.7);

  label {
    margin: 0;
    padding: 0 ${theme.px.grid()} 0 0;
  }
`;

export default MakeCouplingCheckbox;
