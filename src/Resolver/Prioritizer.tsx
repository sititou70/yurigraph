import { css } from '@emotion/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filter_slider_value } from '../FilterSlider/recoil';
import { graph_graph } from '../Graph/recoil';
import { Link } from '../Graph/types';
import { all_graph, getLinkDetail } from '../Graph/utils';
import theme from '../theme';
import {
  resolver_prioritizer_links,
  resolver_prioritizer_one_on_one_mode,
} from './recoil';

export const Prioritizer: FC = () => {
  const [_prioritized_links, _setPrioritizedLinks] = useRecoilState(
    resolver_prioritizer_links
  );
  const addPrioritizedLinks = (link: Link) => {
    _setPrioritizedLinks([..._prioritized_links, link]);
  };
  const deletePrioritizedLinks = (link: Link) => {
    _setPrioritizedLinks(
      _prioritized_links.filter(
        (prioritized_link) => prioritized_link.id !== link.id
      )
    );
  };
  const resetPrioritizedLinks = () => {
    _setPrioritizedLinks([]);
  };
  const prioritized_link_ids = new Set(
    _prioritized_links.map((link) => link.id)
  );

  const prioritized_nodes = new Set(
    _prioritized_links.flatMap((link) => link.nodes)
  );

  const filter_value = useRecoilValue(filter_slider_value);
  const link_details = all_graph.links
    .filter((link) => link.num >= filter_value)
    .concat()
    .sort((x, y) => y.num - x.num)
    .map((link) => {
      const detail = getLinkDetail(link.id);
      return detail ? { link, detail } : undefined;
    })
    .filter(
      (link_detail): link_detail is Exclude<typeof link_detail, undefined> =>
        link_detail !== undefined
    );

  const graph = useRecoilValue(graph_graph);
  const auto_selected_link_ids = new Set(graph.links.map((link) => link.id));

  const [one_on_one_mode, setOneOnOneMode] = useRecoilState(
    resolver_prioritizer_one_on_one_mode
  );

  return (
    <div
      css={css`
        min-width: 250px;
        max-width: 30vw;
        padding: ${theme.px.grid()};

        .tip {
          font-size: 1rem;
        }
      `}
    >
      <p>優先したいカップリングを選択してください</p>
      <details>
        <summary>使い方</summary>
        <ul
          css={css`
            margin-top: 0;
            padding-left: ${theme.px.grid()};
            .legend {
              transform: scale(0.75);
              padding: 0;
            }
          `}
        >
          <li>
            <Checkbox className="legend" checked={false} />
            ：優先できます．「1対1に解決」で採用されなかったカップリングです．
          </li>
          <li>
            <Checkbox className="legend" checked={true} />
            ：優先しています．
          </li>
          <li>
            <Checkbox
              className="legend"
              checked={false}
              indeterminate={true}
              disabled={true}
            />
            ：「1対1に解決」によって自動的に成立しているカップリングです．
          </li>
          <li>
            <Checkbox className="legend" checked={false} disabled={true} />
            ：「1対1にこだわる」によって優先できません．同じキャラクターを含む他のカップリングが優先済みです．
          </li>
        </ul>
      </details>

      <FormControlLabel
        control={
          <Checkbox
            checked={one_on_one_mode}
            onChange={(e) => setOneOnOneMode(e.target.checked)}
          />
        }
        label={
          <span>
            1対1にこだわる
            <Tooltip
              title="同じキャラクターを含むカップリングを1つしか優先できなくします"
              className="tip"
            >
              <HelpOutlineIcon />
            </Tooltip>
          </span>
        }
      />
      <FormControlLabel
        control={
          <IconButton onClick={resetPrioritizedLinks}>
            <DeleteForeverIcon />
          </IconButton>
        }
        label="設定をリセット"
      />
      <ol
        css={css`
          margin: ${theme.px.grid()} 0 0 0;
          padding: 0;
          list-style: none;
        `}
      >
        {link_details.map(({ link, detail }) => (
          <li key={link.id}>
            <FormControlLabel
              control={
                <Checkbox
                  name={`${detail.tag.name}を優先して解決`}
                  checked={prioritized_link_ids.has(link.id)}
                  indeterminate={
                    !prioritized_link_ids.has(link.id) &&
                    auto_selected_link_ids.has(link.id)
                  }
                  disabled={
                    !prioritized_link_ids.has(link.id) &&
                    ((one_on_one_mode &&
                      (prioritized_nodes.has(link.nodes[0]) ||
                        prioritized_nodes.has(link.nodes[1]))) ||
                      auto_selected_link_ids.has(link.id))
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      addPrioritizedLinks(link);
                    } else {
                      deletePrioritizedLinks(link);
                    }
                  }}
                />
              }
              label={
                <span>
                  {detail.tag.name}
                  <Tooltip
                    title={`${detail.coupling.characters[0].name} × ${detail.coupling.characters[1].name} (${detail.tag.num}作品)`}
                    className="tip"
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                </span>
              }
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
