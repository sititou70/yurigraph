import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { NodeData, LinkData, ForceSimulation, ElementSelection } from './types';

export const getInitializedForce = (
  nodes: NodeData[],
  links: LinkData[],
  options: {
    classname: { node: string; link: string };
    window_size: { width: number; height: number };
    link_distance: {
      weight: number;
      margin: number;
    };
  }
): {
  force_simulation: ForceSimulation;
  registerGraph: (svg: Element) => void;
} => {
  const force_simulation = d3
    .forceSimulation(nodes as SimulationNodeDatum[])
    .force('charge', d3.forceManyBody().strength(-10))
    .force(
      'link',
      d3
        .forceLink(links)
        .distance(
          d =>
            options.link_distance.weight / d.num + options.link_distance.margin
        )
    )
    .force(
      'center',
      d3
        .forceCenter()
        .x(options.window_size.width / 2)
        .y(options.window_size.height / 2)
    );

  let graph: ElementSelection | null = null;
  const registerGraph = (svg: Element) => {
    graph = d3.select(svg);
    force_simulation.on('tick', () => {
      if (graph === null) return;
      graph.call(selection => {
        selection
          .selectAll('.' + options.classname.node)
          .call(selection =>
            selection.attr(
              'transform',
              (d: any) => 'translate(' + d.x + ',' + d.y + ')'
            )
          );
        selection.selectAll('.' + options.classname.link).call(selection =>
          selection
            .attr('x1', (d: any) => d.source.x)
            .attr('y1', (d: any) => d.source.y)
            .attr('x2', (d: any) => d.target.x)
            .attr('y2', (d: any) => d.target.y)
        );
      });
    });
  };

  return { force_simulation, registerGraph };
};

export default getInitializedForce;
