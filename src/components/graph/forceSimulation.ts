import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import stats from 'stats-lite';
import { ElementSelection, ForceSimulation, LinkData, NodeData } from './types';

const makeSigmoid = require('awesome-sigmoid').default;

export const getInitializedForce = (
  nodes: NodeData[],
  links: LinkData[],
  options: {
    classname: { node: string; link: string };
    window_size: { width: number; height: number };
    link_distance: number;
  }
): {
  force_simulation: ForceSimulation;
  registerGraph: (svg: Element) => void;
} => {
  const nums = links.map((x) => x.num);
  const sigmoid = makeSigmoid({
    center: stats.mean(nums),
    deviation: stats.stdev(nums),
    deviation_output: 0.9,
  });

  const force_simulation = d3
    .forceSimulation(nodes as SimulationNodeDatum[])
    .force('charge', d3.forceManyBody().strength(-300).distanceMax(300))
    .force(
      'link',
      d3
        .forceLink(links)
        .distance((d) => options.link_distance * (2 - sigmoid(d.num)))
        .strength(nodes.length / links.length)
        .iterations(10)
    )
    .force(
      'center',
      d3
        .forceCenter()
        .x(options.window_size.width / 2)
        .y(options.window_size.height / 2)
    )
    .force('collide', d3.forceCollide(10));

  let graph: ElementSelection | null = null;
  const registerGraph = (svg: Element) => {
    graph = d3.select(svg);
    force_simulation.on('tick', () => {
      if (graph === null) return;
      graph.call((selection) => {
        selection
          .selectAll('.' + options.classname.node)
          .call((selection) =>
            selection.attr(
              'transform',
              (d: any) =>
                d !== undefined && 'translate(' + d.x + ',' + d.y + ')'
            )
          );
        selection
          .selectAll('.' + options.classname.link)
          .call((selection) =>
            selection.attr('d', (d: any) =>
              d !== undefined
                ? `M ${d.source.x},${d.source.y} L ${d.target.x},${d.target.y}`
                : ''
            )
          );
      });
    });
  };

  return { force_simulation, registerGraph };
};

export default getInitializedForce;
