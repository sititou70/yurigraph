import React, { useState, FC } from 'react';
import Graph from './Graph';
import FilterNumSlider from './FilterNumSlider';
import FriendsDialog from './FriendsDialog';
import styled from '@emotion/styled';
import { NodeData, LinkData } from './types';
import couplings_json from '../../couplings.json';
import { Couplings } from 'deregraph-scraping';
import bg from '../../styles/bg.png';
const deepCopy = require('deep-copy');

//utils
const initGetNodesAndLinks = (): ((
  num_filter: number
) => { nodes: NodeData[]; links: LinkData[] }) => {
  const couplings: Couplings = couplings_json;

  type LinkDataOmitSourceTarget = Omit<LinkData, 'source' | 'target'>;
  const all_links: LinkDataOmitSourceTarget[] = couplings
    .map(x => ({ ...x, tag: x.tags.reduce((s, x) => (s.num > x.num ? s : x)) }))
    .map((x, i) => ({
      ...x.tag,
      id: i,
      source_name: x.characters[0],
      target_name: x.characters[1],
    }));

  return (num_filter: number) => {
    const filterd_links: LinkDataOmitSourceTarget[] = all_links.filter(
      x => x.num >= num_filter
    );
    const nodes: NodeData[] = filterd_links
      .map(x => [x.source_name, x.target_name])
      .reduce((s, x) => [...s, ...x])
      .filter((x, i, self) => self.indexOf(x) === i)
      .map((x, i) => ({ id: i, name: x }));
    const node_name2id: { [key: string]: number } = nodes
      .map(x => ({ [x.name]: x.id }))
      .reduce((s, x) => ({ ...s, ...x }));

    const links: LinkData[] = filterd_links.map(x => ({
      ...x,
      source: node_name2id[x.source_name],
      target: node_name2id[x.target_name],
    }));

    return deepCopy({ links, nodes });
  };
};
const getNodesAndLinks = initGetNodesAndLinks();

// components
export const DeleGraph: FC<{}> = () => {
  const [node_and_links, setNodesAndLinks] = useState(getNodesAndLinks(100));

  // dialog
  const [dialog_name, setDialogName] = useState<string | null>(null);
  const [dialog_open, setDialogOpen] = useState<boolean>(false);

  return (
    <Root>
      <Graph
        {...node_and_links}
        onNodeClick={name => {
          setDialogName(name);
          setDialogOpen(true);
        }}
      />
      <FilterNumSlider
        default_value={100}
        step={20}
        min={20}
        max={400}
        onChange={num => setNodesAndLinks(getNodesAndLinks(num))}
      />
      <FriendsDialog
        name={dialog_name ? dialog_name : ''}
        open={dialog_open}
        onClose={() => setDialogOpen(false)}
      />
    </Root>
  );
};
const Root = styled.div`
  background: url(${bg});
`;

export default DeleGraph;
