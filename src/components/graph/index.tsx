import { useState, FC, useCallback } from 'react';
import Graph from './Graph';
import FilterNumSlider from './FilterNumSlider';
import MakeCouplingSettings from './MakeCouplingSettings';
import FriendsDialog from './FriendsDialog';
import { NodeData, LinkData, LinkDataOmitSourceTarget } from './types';
import { Couplings } from 'yurigraph-scraping';
import stats from 'stats-lite';
import couplings_json_import from '../../couplings.json';
import { Drawer } from '@material-ui/core';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CouplingSelector from './CouplingSelector';
const deepCopy = require('deep-copy');

const couplings_json: Couplings = couplings_json_import;

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
  const couplings = couplings_json;

  const all_links: LinkDataOmitSourceTarget[] = couplings
    .map((x) => ({
      ...x,
      tag: x.tags.reduce((s, x) => (s.num > x.num ? s : x)),
    }))
    .map((x, i) => ({
      ...x.tag,
      id: i,
      source_name: x.characters[0].name,
      target_name: x.characters[1].name,
    }));

  return (num_filter: number): NodesAndLinks => {
    return getNodesAndLinksFromLinks(
      all_links.filter((x) => x.num >= num_filter)
    );
  };
};
const getNodesAndLinks = initGetNodesAndLinks();

const makeCoupling = (
  nodes_and_links: NodesAndLinks,
  reserved_links: LinkDataOmitSourceTarget[]
): NodesAndLinks => {
  const reserved_charactors: Set<string> = new Set(
    reserved_links
      .map((x) => [x.source_name, x.target_name])
      .reduce((s, x) => [...s, ...x], [])
  );
  const charactors: Set<string> = new Set(
    nodes_and_links.nodes
      .map((x) => x.name)
      .filter((x) => !reserved_charactors.has(x))
  );
  const reserved_link_names: Set<string> = new Set(
    reserved_links.map((x) => x.name)
  );
  let sorted_links: LinkData[] = nodes_and_links.links
    .filter((x) => !reserved_link_names.has(x.name))
    .sort((x, y) => y.num - x.num);
  let resolved_links: LinkDataOmitSourceTarget[] = reserved_links;

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
    (
      filter_num: number,
      resolve_one_to_many: boolean,
      reserved_links: LinkDataOmitSourceTarget[]
    ) =>
      resolve_one_to_many
        ? _setNodesAndLinks(
            makeCoupling(getNodesAndLinks(filter_num), reserved_links)
          )
        : _setNodesAndLinks(getNodesAndLinks(filter_num)),
    []
  );

  // dialog
  const [dialog_name, setDialogName] = useState<string | null>(null);
  const [dialog_open, setDialogOpen] = useState<boolean>(false);

  // drawer
  const [drawer_open, setDrawerOpen] = useState(false);
  const [reserved_links, setReservedLinks] = useState<
    LinkDataOmitSourceTarget[]
  >([]);

  return (
    <Root>
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
            setNodesAndLinks(num, resolve_one_to_many, reserved_links);
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [resolve_one_to_many, reserved_links]
        )}
      />
      <MakeCouplingSettings
        checked={resolve_one_to_many}
        onChange={useCallback(
          (v) => {
            setResolveOneToMany(v);
            setNodesAndLinks(filter_num, v, reserved_links);
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [filter_num, reserved_links]
        )}
        onClickSettingButton={useCallback(() => {
          setDrawerOpen(true);
        }, [])}
      />
      <FriendsDialog
        name={dialog_name ? dialog_name : ''}
        open={dialog_open}
        onClose={() => setDialogOpen(false)}
      />
      {resolve_one_to_many && (
        <Drawer
          className="drawer"
          variant="persistent"
          anchor="right"
          open={drawer_open}
        >
          <div className="drawer-header">
            <IconButton
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <CouplingSelector
            all_links={getNodesAndLinks(filter_num).links}
            auto_selected_links={node_and_links.links}
            onChanged={(selected_links) => {
              setReservedLinks(selected_links);
              setNodesAndLinks(filter_num, resolve_one_to_many, selected_links);
            }}
          />
        </Drawer>
      )}
    </Root>
  );
};

const Root = styled.div`
  .drawer .MuiPaper-root {
    padding: ${theme.px.grid()};

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-bottom: ${theme.px.grid()};
    }
  }
`;

export default GraphRoot;
