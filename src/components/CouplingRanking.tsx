import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { FC } from 'react';
import { Coupling, Couplings } from 'yurigraph-scraping';
import coupling_json_import from '../couplings.json';
import theme from '../styles/theme';
import { PixivDictLink, PixivTagLink } from './pixiv-utils';
const coupling_json: Couplings = coupling_json_import;

type CouplingTag = {
  characters: Coupling['characters'];
  tag: Coupling['tags'][0];
};

const CouplingListItem: FC<{ coupling: CouplingTag; rank: number }> = ({
  coupling,
  rank,
}) => (
  <StyledListItem rank={rank}>
    <PixivTagLink title={coupling.tag.name} />
    <span className="characters">
      {coupling.characters
        .map((x) => (
          <PixivDictLink
            title={x.dict_entry ? x.dict_entry : x.name}
            text={x.name}
          />
        ))
        .reduce((s, x) => (
          <>
            {s} × {x}
          </>
        ))}
    </span>
    <span className="sideinfo">({coupling.tag.num}作品)</span>
  </StyledListItem>
);
const StyledListItem = styled.li<{ rank: number }>`
  font-size: ${(props) => Math.max(32 - props.rank / 2, 16)}px;

  .characters {
    display: inline-block;
    margin-left: 1em;
    font-size: 0.75em;

    a {
      opacity: 0.8;
    }
  }

  .sideinfo {
    display: inline-block;
    margin-left: 1em;
    font-size: 0.75em;
  }
`;

export const CouplingRanking: FC<{}> = () => {
  const coupling_tags: CouplingTag[] = coupling_json
    .map((x) => x.tags.map((y) => ({ characters: x.characters, tag: y })))
    .reduce((s, x) => [...s, ...x])
    .sort((x, y) => y.tag.num - x.tag.num);
  return (
    <Root>
      <span>
        <Typography id="カップリングランキング" variant="h2">
          カップリングランキング
        </Typography>
        <ol>
          {coupling_tags.map((x, i) => (
            <CouplingListItem coupling={x} rank={i + 1} key={i} />
          ))}
        </ol>
      </span>
    </Root>
  );
};
const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.px.grid(2)} ${theme.px.grid()} 0 ${theme.px.grid(2)};
  box-shadow: 0 0 ${theme.px.grid()} #0002;

  h2 {
    font-size: 1.5rem;
  }

  ol {
    margin-top: 10px;
  }
`;

export default CouplingRanking;
