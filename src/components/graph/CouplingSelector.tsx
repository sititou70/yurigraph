import { FC } from 'react';
import styled from '@emotion/styled';
import { LinkData } from './types';

// components
export const CouplingSelector: FC<{
  all_links: LinkData[];
  auto_selected_links: LinkData[];
  onChanged: (selected_links: LinkData[]) => void;
}> = ({}) => {
  return <Root></Root>;
};
const Root = styled.div``;

export default CouplingSelector;
