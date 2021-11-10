import styled from '@emotion/styled';
import { Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import theme from '../../styles/theme';
import { LinkDataOmitSourceTarget } from './types';

// components
export const CouplingSelector: FC<{
  all_links: LinkDataOmitSourceTarget[];
  auto_selected_links: LinkDataOmitSourceTarget[];
  onChanged: (selected_links: LinkDataOmitSourceTarget[]) => void;
}> = ({ all_links, auto_selected_links, onChanged }) => {
  const [selected_links, _setSelectedLinks] = useState<
    Map<string, LinkDataOmitSourceTarget>
  >(new Map());
  const setSelectedLinks = (map: typeof selected_links) =>
    _setSelectedLinks(new Map(map));
  const selectedCharactors = new Set(
    Array.from(selected_links.values())
      .map((x) => [x.source_name, x.target_name])
      .reduce((s, x) => [...s, ...x], [])
  );

  const auto_selected_names = useMemo(
    () => new Set(auto_selected_links.map((x) => x.name)),
    [auto_selected_links]
  );
  const sorted_all_links = useMemo(
    () => all_links.sort((x, y) => y.num - x.num),
    [all_links]
  );

  const [coupling_mode, setCouplingMode] = useState(true);

  return (
    <Root>
      <p>優先したいカップリングを選択してください</p>
      <details>
        <summary>凡例</summary>
        <ul className="legends">
          <li>
            <Checkbox className="legend" checked={false} />
            ：選択できます
          </li>
          <li>
            <Checkbox className="legend" checked={true} />
            ：選択されています
          </li>
          <li>
            <Checkbox
              className="legend"
              checked={false}
              indeterminate={true}
              disabled={true}
            />
            ：「1対1に解決」によって自動的に選択されています
          </li>
          <li>
            <Checkbox className="legend" checked={false} disabled={true} />
            ：「1対1にこだわる」によって選択できません．同じキャラクターを含む他のカップリングが選択済みです．
          </li>
        </ul>
      </details>

      <FormControlLabel
        control={
          <Checkbox
            checked={coupling_mode}
            onChange={(e) => setCouplingMode(e.target.checked)}
            name="force_coupling"
          />
        }
        label={
          <span>
            1対1にこだわる
            <Tooltip
              title="同じキャラクターを含むカップリングを1つしか選択できなくします"
              className="tip"
            >
              <HelpOutlineIcon />
            </Tooltip>
          </span>
        }
      />
      <FormControlLabel
        control={
          <IconButton
            onClick={() => {
              setSelectedLinks(new Map());
              onChanged([]);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        label={'設定をリセット'}
      />
      <ol>
        {sorted_all_links.map((x) => (
          <li key={x.name}>
            <FormControlLabel
              control={
                <Checkbox
                  name={`${x.name}を優先して解決`}
                  checked={selected_links.has(x.name)}
                  indeterminate={
                    !selected_links.has(x.name) &&
                    auto_selected_names.has(x.name)
                  }
                  disabled={
                    !selected_links.has(x.name) &&
                    ((coupling_mode &&
                      (selectedCharactors.has(x.source_name) ||
                        selectedCharactors.has(x.target_name))) ||
                      auto_selected_names.has(x.name))
                  }
                  onChange={(e) => {
                    let changed_map;
                    if (e.target.checked) {
                      changed_map = selected_links.set(x.name, x);
                      setSelectedLinks(changed_map);
                    } else {
                      selected_links.delete(x.name);
                      changed_map = selected_links;
                      setSelectedLinks(selected_links);
                    }

                    onChanged(Array.from(changed_map.values()));
                  }}
                />
              }
              label={
                <span>
                  {x.name}
                  <Tooltip
                    title={`${x.source_name} × ${x.target_name} (${x.num}作品)`}
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
    </Root>
  );
};
const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 30vw;

  p {
    margin: 0;
  }

  details {
    margin-bottom: ${theme.px.grid()};
  }

  .legends {
    li {
      margin: 0;
    }
    .legend {
      transform: scale(0.75);
      padding: 0;
    }
  }

  .tip {
    font-size: 1rem;
  }

  ol {
    margin-top: ${theme.px.grid()};
    list-style: none;
  }
`;

export default CouplingSelector;
