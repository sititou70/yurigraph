import React, { FC } from 'react';
import FriendsInfo from '../FriendsInfo';
import { Dialog, DialogTitle } from '@material-ui/core';
import styled from '@emotion/styled';
import { PixivDictLink } from '../pixiv-utils';
import theme from '../../styles/theme';
import couplings_json_import from '../../couplings.json';
import { Character, Couplings } from 'yurigraph-scraping';

const couplings_json: Couplings = couplings_json_import;
const name2character: Map<string, Character> = new Map();
couplings_json.forEach((x) => {
  x.characters.forEach((x) => name2character.set(x.name, x));
});

export const FriendsDialog: FC<{
  name: string;
  open: boolean;
  onClose: () => void;
}> = ({ name, open, onClose }) => {
  const character = name2character.get(name);
  if (character === undefined) return null;

  return (
    <DialogRoot
      onClose={() => onClose()}
      aria-labelledby="friends-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="friends-dialog-title">
        <PixivDictLink
          title={character.dict_entry ? character.dict_entry : character.name}
        />{' '}
        のカップリング一覧
      </DialogTitle>
      <StyledFriendsInfo name={name} />
    </DialogRoot>
  );
};
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
