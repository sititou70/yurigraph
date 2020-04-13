import React, { useState, FC, useCallback } from 'react';
import Graph from './Graph';
import FilterNumSlider from './FilterNumSlider';
import MakeCouplingCheckbox from './MakeCouplingCheckbox';
import FriendsDialog from './FriendsDialog';
import { NodeData, LinkData } from './types';
import couplings_json from '../../couplings.json';
import { Couplings } from 'yurigraph-scraping';
import stats from 'stats-lite';
const deepCopy = require('deep-copy');

//utils
const nums = couplings_json
  .map((x) => x.tags.map((x) => x.num))
  .reduce((s, x) => [...s, ...x]);
const num_stats = {
  max: nums.reduce((s, x) => (s > x ? s : x)),
  min: nums.reduce((s, x) => (s < x ? s : x)),
  center: parseInt(process.env.REACT_APP_DEFAULT_FILTER_VALUE as string),
  stdev: stats.stdev(nums),
};

type NodesAndLinks = { nodes: NodeData[]; links: LinkData[] };
type LinkDataOmitSourceTarget = Omit<LinkData, 'source' | 'target'>;
const getNodesAndLinksFromLinks = (
  base_links: LinkDataOmitSourceTarget[]
): NodesAndLinks => {
  const nodes: NodeData[] = base_links
    .map((x) => [x.source_name, x.target_name])
    .reduce((s, x) => [...s, ...x])
    .filter((x, i, self) => self.indexOf(x) === i)
    .map((x, i) => ({ id: i, name: x }));
  const node_name2id: { [key: string]: number } = nodes
    .map((x) => ({ [x.name]: x.id }))
    .reduce((s, x) => ({ ...s, ...x }));

  const links: LinkData[] = base_links.map((x) => ({
    ...x,
    source: node_name2id[x.source_name],
    target: node_name2id[x.target_name],
  }));

  return deepCopy({ links, nodes });
};

const initGetNodesAndLinks = (): ((num_filter: number) => NodesAndLinks) => {
  const couplings: Couplings = couplings_json;

  const all_links: LinkDataOmitSourceTarget[] = couplings
    .map((x) => ({
      ...x,
      tag: x.tags.reduce((s, x) => (s.num > x.num ? s : x)),
    }))
    .map((x, i) => ({
      ...x.tag,
      id: i,
      source_name: x.characters[0],
      target_name: x.characters[1],
    }));

  return (num_filter: number): { nodes: NodeData[]; links: LinkData[] } => {
    return getNodesAndLinksFromLinks(
      all_links.filter((x) => x.num >= num_filter)
    );
  };
};
const getNodesAndLinks = initGetNodesAndLinks();

const makeCoupling = (nodes_and_links: NodesAndLinks): NodesAndLinks => {
  const charactors: Set<string> = new Set(
    nodes_and_links.nodes.map((x) => x.name)
  );
  let sorted_links: LinkData[] = nodes_and_links.links.sort(
    (x, y) => y.num - x.num
  );
  let resolved_links: LinkData[] = [];

  sorted_links.forEach((x) => {
    if (charactors.has(x.source_name) && charactors.has(x.target_name)) {
      // resolve link
      resolved_links.push(x);
      charactors.delete(x.source_name);
      charactors.delete(x.target_name);
    }
  });

  const new_nodes_and_links = getNodesAndLinksFromLinks(resolved_links);
  return {
    links: new_nodes_and_links.links,
    nodes: [
      ...new_nodes_and_links.nodes,
      ...Array.from(charactors, (x, i) => ({
        id: new_nodes_and_links.nodes.length + i,
        name: x,
      })),
    ],
  };
};

// components
export const GraphRoot: FC<{}> = () => {
  const default_filter_num = Math.floor(num_stats.center);
  const [filter_num, setFilterNum] = useState(default_filter_num);
  const [node_and_links, _setNodesAndLinks] = useState(
    getNodesAndLinks(Math.floor(filter_num))
  );
  const [resolve_one_to_many, setResolveOneToMany] = useState(false);
  const setNodesAndLinks = useCallback(
    (filter_num: number, resolve_one_to_many: boolean) =>
      resolve_one_to_many
        ? _setNodesAndLinks(makeCoupling(getNodesAndLinks(filter_num)))
        : _setNodesAndLinks(getNodesAndLinks(filter_num)),
    []
  );

  // dialog
  const [dialog_name, setDialogName] = useState<string | null>(null);
  const [dialog_open, setDialogOpen] = useState<boolean>(false);

  return (
    <div>
      <Graph
        {...node_and_links}
        onNodeClick={(name) => {
          setDialogName(name);
          setDialogOpen(true);
        }}
      />
      <FilterNumSlider
        default_value={default_filter_num}
        step={Math.floor(num_stats.stdev / 12)}
        min={Math.max(Math.floor(num_stats.center - num_stats.stdev / 3), 0)}
        max={Math.floor(num_stats.center + num_stats.stdev)}
        onChange={useCallback(
          (num) => {
            setFilterNum(num);
            setNodesAndLinks(num, resolve_one_to_many);
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [resolve_one_to_many]
        )}
      />
      <MakeCouplingCheckbox
        checked={resolve_one_to_many}
        onChange={useCallback(
          (v) => {
            setResolveOneToMany(v);
            setNodesAndLinks(filter_num, v);
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [filter_num]
        )}
      />
      <FriendsDialog
        name={dialog_name ? dialog_name : ''}
        open={dialog_open}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default GraphRoot;
