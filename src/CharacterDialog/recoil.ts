import { atom } from 'recoil';

export const character_dialog_open = atom({
  key: 'character_dialog/open',
  default: false,
});

export const character_dialog_name = atom({
  key: 'character_dialog/name',
  default: '',
});
