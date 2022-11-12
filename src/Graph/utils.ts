import makeSigmoid from 'awesome-sigmoid';
import stats from 'stats-lite';
import { Character, Coupling } from 'yurigraph-scraping';
import { couplings } from '../couplings';
import { D3Graph, D3Link, D3Node, Graph, Link, LinkId, NodeId } from './types';

// setup fundamental graph
//// node
const characters: Character[] = (() => {
  const name2character: Map<Character['name'], Character> = new Map();
  couplings.forEach((coupling) =>
    coupling.characters.forEach((character) =>
      name2character.set(character.name, character)
    )
  );
  return Array.from(name2character.values());
})();

const node_id2character: Map<NodeId, Character> = new Map(
  characters.map((character, i) => [i, character])
);
const all_nodes: NodeId[] = Array.from(node_id2character.keys());

export type NodeDetail = Character;
export const getNodeDetail = (node_id: NodeId): NodeDetail | undefined =>
  node_id2character.get(node_id);

//// link
const name2node_id = new Map(
  Array.from(node_id2character.entries()).map(([id, character]) => [
    character.name,
    id,
  ])
);

export type LinkDetail = {
  coupling: Coupling;
  tag: Coupling['tags'][number];
};
const link_id2detail = new Map<LinkId, LinkDetail>();

const all_links: Link[] = couplings
  .map((coupling, id): Omit<Link, 'index'> | undefined => {
    if (coupling.tags.length === 0) return undefined;
    const tag = coupling.tags.reduce((x, y) => (x.num > y.num ? x : y));

    const node1 = name2node_id.get(coupling.characters[0].name);
    const node2 = name2node_id.get(coupling.characters[1].name);
    if (node1 === undefined) return undefined;
    if (node2 === undefined) return undefined;

    link_id2detail.set(id, { coupling, tag });
    return {
      id,
      num: tag.num,
      nodes: [node1, node2],
    };
  })
  .filter((link): link is Exclude<typeof link, undefined> => link !== undefined)
  .map((link, index) => ({ ...link, index }));

export const getLinkDetail = (link_id: LinkId): LinkDetail | undefined =>
  link_id2detail.get(link_id);

//// graph
export const all_graph: Graph = {
  nodes: all_nodes,
  links: all_links,
};

// graph utils
export const filterGraphByNum = (graph: Graph, num: number): Graph => {
  const links = graph.links.filter((link) => link.num >= num);
  const nodes = Array.from(new Set(links.flatMap((link) => link.nodes)));
  return { nodes, links };
};

export const resolveGraphOneOnOne = (
  graph: Graph,
  prioritized_links: Link[]
): Graph => {
  const resolved_links: Link[] = [];
  const resolved_nodes = new Set();
  const resolveLink = (link: Link, force: boolean | undefined = false) => {
    const resolvable =
      !resolved_nodes.has(link.nodes[0]) && !resolved_nodes.has(link.nodes[1]);

    if (resolvable || force) {
      resolved_links.push(link);
      resolved_nodes.add(link.nodes[0]);
      resolved_nodes.add(link.nodes[1]);
    }
  };

  // first, resolve prioritized links
  prioritized_links.forEach((link) => resolveLink(link, true));

  // next, resolve normal links
  graph.links
    .concat()
    .sort((x, y) => y.num - x.num)
    .forEach((link) => resolveLink(link));

  return { nodes: graph.nodes, links: resolved_links };
};

export const getRelatedNodesByLinks = (links: Link[]) => {
  const related_nodes: Map<NodeId, Set<NodeId>> = new Map(
    all_nodes.map((node) => [node, new Set()])
  );
  const addNode = (source: NodeId, target: NodeId) => {
    const set = related_nodes.get(source);
    if (set === undefined) return;
    set.add(target);
  };
  links.forEach((link) => {
    addNode(link.nodes[0], link.nodes[1]);
    addNode(link.nodes[1], link.nodes[0]);
  });

  return related_nodes;
};

export const getSigmoidByLinks = (links: Link[]) => {
  const nums = links.flatMap((link) => link.num);
  return makeSigmoid({
    center: stats.mean(nums),
    deviation: stats.stdev(nums),
    deviation_output: 0.9,
  });
};

export const getD3GraphByGraph = (graph: Graph): D3Graph => {
  const sorted_links = graph.links.concat().sort((x, y) => y.num - x.num);
  const sorted_nodes = [
    ...sorted_links.flatMap((link) => link.nodes),
    ...graph.nodes,
  ].filter((x, i, self) => self.indexOf(x) === i);

  const d3_nodes: D3Node[] = sorted_nodes.map((node_id, index) => ({
    index,
    node_id,
  }));

  const old_node2new_node = new Map(sorted_nodes.map((node, i) => [node, i]));
  const d3_links: D3Link[] = sorted_links
    .map((link, index): D3Link | undefined => {
      const source = old_node2new_node.get(link.nodes[0]);
      const target = old_node2new_node.get(link.nodes[1]);
      if (source === undefined) return undefined;
      if (target === undefined) return undefined;

      return {
        index,
        source,
        target,
        link_id: link.id,
        node_ids: link.nodes,
      };
    })
    .filter(
      (link): link is Exclude<typeof link, undefined> => link !== undefined
    );

  return { nodes: d3_nodes, links: d3_links };
};
