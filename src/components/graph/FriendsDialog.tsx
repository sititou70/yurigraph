import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { FC } from 'react';
import { Character, Couplings } from 'yurigraph-scraping';
import couplings_json_import from '../../couplings.json';
import theme from '../../styles/theme';
import FriendsInfo from '../FriendsInfo';
import { PixivDictLink } from '../pixiv-utils';

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
          text={character.name}
        />
        のカップリング一覧
        <IconButton className="close-icon" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <StyledFriendsInfo name={name} />
    </DialogRoot>
  );
};
const StyledFriendsInfo = styled(FriendsInfo)`
  margin-left: ${theme.px.grid(2.5)};
  padding-top: ${theme.px.grid()};
`;

const DialogRoot = styled(Dialog)`
  #friends-dialog-title {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid ${theme.colors.border};

    .close-icon {
      margin-left: auto;
    }
  }
`;

export default FriendsDialog;
