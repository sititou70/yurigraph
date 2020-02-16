import React, { useState, FC } from 'react';
import Graph from './Graph';
import styled from '@emotion/styled';
import { NodeData, LinkData } from './types';
import couplings_json from '../../couplings.json';
import { Couplings } from 'deregraph-scraping';

//utils
const initGetNodesAndLinks = (): ((
  num_filter: number
) => { nodes: NodeData[]; links: LinkData[] }) => {
  const couplings: Couplings = couplings_json;

  type LinkDataStringSourceTarget = Omit<LinkData, 'source' | 'target'> & {
    source_str: string;
    target_str: string;
  };
  const all_links: LinkDataStringSourceTarget[] = couplings
    .map(x => ({ ...x, tag: x.tags.reduce((s, x) => (s.num > x.num ? s : x)) }))
    .map((x, i) => ({
      ...x.tag,
      id: i,
      source_str: x.characters[0],
      target_str: x.characters[1],
    }));

  const characters: string[] = couplings
    .map(x => x.characters)
    .reduce((s, x) => [...s, ...x])
    .filter((x, i, self) => self.indexOf(x) === i);

  return (num_filter: number) => {
    const filterd_links: LinkDataStringSourceTarget[] = all_links.filter(
      x => x.num >= num_filter
    );
    const nodes: NodeData[] = filterd_links
      .map(x => [x.source_str, x.target_str])
      .reduce((s, x) => [...s, ...x])
      .filter((x, i, self) => self.indexOf(x) === i)
      .map((x, i) => ({ id: i, name: x }));
    const node_name2id: { [key: string]: number } = nodes
      .map(x => ({ [x.name]: x.id }))
      .reduce((s, x) => ({ ...s, ...x }));

    const links: LinkData[] = filterd_links.map(x => ({
      ...x,
      source: node_name2id[x.source_str],
      target: node_name2id[x.target_str],
    }));

    return { links, nodes };
  };
};
const getNodesAndLinks = initGetNodesAndLinks();

// components
export const DeleGraph: FC<{}> = () => {
  const [node_and_links, setNodesAndLinks] = useState(getNodesAndLinks(100));

  return (
    <Root>
      <Graph {...node_and_links} />
    </Root>
  );
};
const Root = styled.div``;

export default DeleGraph;
