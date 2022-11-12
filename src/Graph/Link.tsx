import { css } from '@emotion/react';
import * as d3 from 'd3';
import mixColor from 'mix-color';
import { FC, useId } from 'react';
import { useRecoilValue } from 'recoil';
import theme from '../theme';
import { graph_focused_node, graph_sigmoid } from './recoil';
import { D3Link, D3Node } from './types';
import { LinkDetail } from './utils';

const ROOT_CLASS_NAME = 'link';

export const Link: FC<{
  link: D3Link;
  detail: LinkDetail;
}> = ({ link, detail }) => {
  const sigmoid = useRecoilValue(graph_sigmoid);
  const weight = sigmoid(detail.tag.num);

  const focused_node_index = useRecoilValue(graph_focused_node);
  const mode: 'normal' | 'activated' | 'inactive' = (() => {
    if (
      link.node_ids[0] === focused_node_index ||
      link.node_ids[1] === focused_node_index
    )
      return 'activated';
    if (focused_node_index !== null) return 'inactive';
    return 'normal';
  })();

  const id = useId();

  const registerLink = (element: Element | null) => {
    if (element === null) return;
    const root = d3.select(element);
    root.datum(link);
  };

  return (
    <>
      <path
        id={id}
        className={ROOT_CLASS_NAME}
        css={css`
          stroke: ${mixColor(theme.colors.main, theme.colors.accent, weight)};
          stroke-width: ${weight * 7 + 3}px;
          opacity: ${mode === 'inactive' ? 0.3 : 1};
          stroke-linecap: round;
          transition: opacity ease 0.3s;
        `}
        ref={registerLink}
      />
      {mode === 'activated' ? (
        <text
          y="-3"
          css={css`
            fill: #000;
            text-anchor: middle;
            font-size: 12px;
          `}
        >
          <textPath href={`#${id}`} startOffset="50%">
            {detail.tag.name}
          </textPath>
        </text>
      ) : null}
    </>
  );
};

export const linkTickHandler = (
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
) => {
  selection
    .selectAll(`.${ROOT_CLASS_NAME}`)
    .call((selection) =>
      (
        selection as unknown as d3.Selection<
          SVGPathElement,
          D3Link & { source: D3Node; target: D3Node },
          SVGSVGElement,
          unknown
        >
      ).attr(
        'd',
        (link) =>
          `M ${link.source.x},${link.source.y} L ${link.target.x},${link.target.y}`
      )
    );
};
