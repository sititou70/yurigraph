import makeSigmoid from 'awesome-sigmoid';
import * as d3 from 'd3';
import { Simulation } from 'd3';
import { D3Graph, D3Link, D3Node } from './types';
import { getLinkDetail } from './utils';

export const LINK_LENGTH = 100;

export const getSimuration = (
  graph: D3Graph,
  options: {
    window_size: { width: number; height: number };
    sigmoid: ReturnType<typeof makeSigmoid>;
  }
): Simulation<D3Node, D3Link> =>
  d3
    .forceSimulation(graph.nodes)
    .force(
      'link',
      d3
        .forceLink(graph.links)
        .distance(LINK_LENGTH)
        .strength((link) => {
          const detail = getLinkDetail(link.link_id);
          if (detail === undefined) return 0.5;
          return options.sigmoid(detail.tag.num);
        })
    )
    .force('collide', d3.forceCollide(LINK_LENGTH / 2).strength(0.5))
    .force('charge', d3.forceManyBody().strength(-LINK_LENGTH * 0.5))
    .force(
      'center',
      d3
        .forceCenter()
        .x(options.window_size.width / 2)
        .y(options.window_size.height / 2)
    );
