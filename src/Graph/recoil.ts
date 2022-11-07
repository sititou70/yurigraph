import { atom, selector } from 'recoil';
import { filter_slider_value } from '../FilterSlider/recoil';
import {
  resolver_enable,
  resolver_prioritizer_links,
} from '../Resolver/recoil';
import { NodeId } from './types';
import {
  all_graph,
  filterGraphByNum,
  getD3GraphByGraph,
  getRelatedNodesByLinks,
  getSigmoidByLinks,
  resolveGraphOneOnOne,
} from './utils';

export const graph_graph = selector({
  key: 'graph/graph',
  get: ({ get }) => {
    const filter_value = get(filter_slider_value);
    const filtered_graph = filterGraphByNum(all_graph, filter_value);

    const resolve_enable = get(resolver_enable);
    const prioritized_links = get(resolver_prioritizer_links);
    const resolved_graph = resolve_enable
      ? resolveGraphOneOnOne(filtered_graph, prioritized_links)
      : filtered_graph;

    return resolved_graph;
  },
});
export const graph_d3graph = selector({
  key: 'graph/d3graph',
  get: ({ get }) => {
    const graph = get(graph_graph);
    return getD3GraphByGraph(graph);
  },
});

export const graph_sigmoid = selector({
  key: 'graph/sigmoid',
  get: ({ get }) => {
    const graph = get(graph_graph);
    return getSigmoidByLinks(graph.links);
  },
});

export const graph_focused_node = atom<NodeId | null>({
  key: 'graph/graph_focused_node',
  default: null,
});
export const graph_activated_nodes = selector<Set<NodeId> | null>({
  key: 'graph/graph_activated_nodes',
  get: ({ get }) => {
    const index = get(graph_focused_node);
    if (index === null) return null;

    const graph = get(graph_graph);
    const indexes = getRelatedNodesByLinks(graph.links).get(index);
    if (indexes === undefined) return null;

    return new Set([index, ...indexes]);
  },
});
