import makeSigmoid from 'awesome-sigmoid';
import * as d3 from 'd3';
import { Simulation } from 'd3';
import {
  LINK_ELEMENT_CLASSNAME,
  LINK_LENGTH,
  NODE_ELEMENT_CLASSNAME,
} from './consts';
import { D3Graph, D3Link, D3Node } from './types';
import { getLinkDetail } from './utils';

export const getForce = (
  graph: D3Graph,
  options: {
    window_size: { width: number; height: number };
    sigmoid: ReturnType<typeof makeSigmoid>;
  }
): {
  force_simulation: Simulation<D3Node, D3Link>;
  registerGraph: (svg: SVGSVGElement) => void;
} => {
  const force_simulation = d3
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
  const registerGraph = (svg: SVGSVGElement) => {
    const graph = d3.select(svg);
    if (graph === null) return;

    force_simulation.on('tick', () => {
      graph.call((selection) => {
        selection
          .selectAll(`.${NODE_ELEMENT_CLASSNAME}`)
          .call((selection) =>
            selection.attr(
              'transform',
              (d: any) => d !== undefined && `translate(${d.x}, ${d.y})`
            )
          );
        selection.selectAll(`.${LINK_ELEMENT_CLASSNAME}`).call((selection) =>
          selection.attr('d', (data: any) => {
            return data !== undefined
              ? `M ${data.source.x},${data.source.y} L ${data.target.x},${data.target.y}`
              : '';
          })
        );
      });
    });
  };

  return { force_simulation, registerGraph };
};
