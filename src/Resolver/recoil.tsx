import { atom } from 'recoil';
import { Link } from '../Graph/types';

export const resolver_enable = atom({ key: 'resolver/enable', default: false });

export const resolver_prioritizer_open = atom({
  key: 'resolver/prioritizer/open',
  default: false,
});
export const resolver_prioritizer_links = atom<Link[]>({
  key: 'resolver/prioritizer/links',
  default: [],
});
export const resolver_prioritizer_one_on_one_mode = atom({
  key: 'resolver/prioritizer/one_on_one_mode',
  default: true,
});
