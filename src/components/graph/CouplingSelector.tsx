import { FC, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { LinkData, LinkDataOmitSourceTarget } from './types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from '../../styles/theme';

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

  const [coupling_mode, setCouplingMode] = useState(false);

  return (
    <Root>
      <FormControlLabel
        control={
          <Checkbox
            checked={coupling_mode}
            onChange={(e) => setCouplingMode(e.target.checked)}
            name="force_coupling"
          />
        }
        label="1対1にこだわる"
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
              label={x.name}
            />
          </li>
        ))}
      </ol>
    </Root>
  );
};
const Root = styled.div`
  min-width: 200px;

  ol {
    margin-top: ${theme.px.grid()};
    list-style: none;
  }
`;

export default CouplingSelector;
