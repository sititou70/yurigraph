import React, { FC } from 'react';
import styled from '@emotion/styled';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
            onChange={e => onChange(e.target.checked)}
            name="resolve_one_to_many"
          />
        }
        label="1対多を解決"
      />
    </CheckboxRoot>
  );
};
const CheckboxRoot = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
`;

export default MakeCouplingCheckbox;
