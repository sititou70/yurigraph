import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import { PixivDictLink, PixivTagLink } from './pixiv-utils';
import coupling_json from '../couplings.json';
import { Coupling } from 'yurigraph-scraping';
import styled from '@emotion/styled';

type CouplingTag = {
  characters: string[];
  tag: Coupling['tags'][0];
};

const CouplingListItem: FC<{ coupling: CouplingTag; rank: number }> = ({
  coupling,
  rank,
}) => (
  <StyledListItem rank={rank}>
    <PixivTagLink name={coupling.tag.name} />
    <span className="characters">
      {coupling.characters
        .map(x => <PixivDictLink name={x} />)
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
  font-size: ${props => Math.max(32 - props.rank / 2, 16)}px;

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
    .map(x => x.tags.map(y => ({ characters: x.characters, tag: y })))
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
  padding: 30px 30px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

  h2 {
    font-size: 24px;
  }

  ol {
    margin-top: 10px;
  }
`;

export default CouplingRanking;
