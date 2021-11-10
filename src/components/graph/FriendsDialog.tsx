import styled from '@emotion/styled';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
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
        <span>
          <PixivDictLink
            title={character.dict_entry ? character.dict_entry : character.name}
            text={character.name}
          />
          のカップリング一覧
        </span>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <StyledFriendsInfo name={name} />
    </DialogRoot>
  );
};
const StyledFriendsInfo = styled(FriendsInfo)`
  margin-left: ${theme.px.grid(2.5)};
`;

const DialogRoot = styled(Dialog)`
  #friends-dialog-title > .MuiTypography-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default FriendsDialog;
