import { css } from '@emotion/react';
import * as d3 from 'd3';
import mixColor from 'mix-color';
import { FC, useEffect, useId, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import theme from '../theme';
import { LINK_ELEMENT_CLASSNAME } from './consts';
import { graph_focused_node, graph_sigmoid } from './recoil';
import { D3Link } from './types';
import { LinkDetail } from './utils';

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

  const root_element = useRef(null);
  useEffect(() => {
    if (root_element.current === null) return;
    const root = d3.select(root_element.current);
    root.datum(link);
    return () => {
      root.datum();
    };
  });

  return (
    <>
      <path
        id={id}
        className={LINK_ELEMENT_CLASSNAME}
        css={css`
          stroke: ${mixColor(theme.colors.main, theme.colors.accent, weight)};
          stroke-width: ${weight * 7 + 3}px;
          opacity: ${mode === 'inactive' ? 0.3 : 1};
          stroke-linecap: round;
        `}
        ref={root_element}
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
