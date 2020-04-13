import React, { FC } from 'react';
import FriendsInfo from '../FriendsInfo';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';
import { PixivDictLink } from '../pixiv-utils';
import theme from '../../styles/theme';

export const FriendsDialog: FC<{
  name: string;
  open: boolean;
  onClose: () => void;
}> = ({ name, open, onClose }) => (
  <DialogRoot
    onClose={() => onClose()}
    aria-labelledby="friends-dialog-title"
    open={open}
    fullWidth={true}
  >
    <DialogTitle id="friends-dialog-title">
      <PixivDictLink title={name} /> のカップリング一覧
      <IconButton className="close_button" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <StyledFriendsInfo name={name} />
  </DialogRoot>
);
const StyledFriendsInfo = styled(FriendsInfo)`
  margin-left: ${theme.px.grid(2.5)};
`;

const DialogRoot = styled(Dialog)`
  .close_button {
    position: absolute;
    right: 0;
  }
`;

export default FriendsDialog;
