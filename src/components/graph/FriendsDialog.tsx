import React, { FC } from 'react';
import FriendsInfo from '../FriendsInfo';
import { Dialog, DialogTitle } from '@material-ui/core';
import styled from '@emotion/styled';

export const FriendsDialog: FC<{
  name: string;
  open: boolean;
  onClose: () => void;
}> = ({ name, open, onClose }) => (
  <Dialog
    onClose={() => onClose()}
    aria-labelledby="friends-dialog-title"
    open={open}
    fullWidth={true}
  >
    <DialogTitle id="friends-dialog-title">
      {name.replace(/\(.*\)/, '')}のカップリング一覧
    </DialogTitle>
    <StyledFriendsInfo name={name} />
  </Dialog>
);
const StyledFriendsInfo = styled(FriendsInfo)`
  margin-left: 50px;
`;

export default FriendsDialog;
