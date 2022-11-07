import { css } from '@emotion/react';
import { FC } from 'react';
import { Coupling } from 'yurigraph-scraping';
import { couplings } from '../couplings';
import { PixivDictLink, PixivTagLink } from '../PixivUtils/PixivUtils';

type CouplingTag = {
  characters: Coupling['characters'];
  tag: Coupling['tags'][0];
};

export const CouplingRanking: FC<{}> = () => {
  const coupling_tags: CouplingTag[] = couplings
    .map((x) => x.tags.map((y) => ({ characters: x.characters, tag: y })))
    .reduce((s, x) => [...s, ...x])
    .sort((x, y) => y.tag.num - x.tag.num);

  return (
    <ol>
      {coupling_tags.map((coupling_tag, i) => {
        const rank = i + 1;

        return (
          <li
            css={css`
              font-size: ${Math.max(32 - rank / 2, 16)}px;
            `}
            key={i}
          >
            <PixivTagLink tag={coupling_tag.tag.name} />
            <span
              css={css`
                display: inline-block;
                margin-left: 1em;
                font-size: 0.75em;
              `}
            >
              {coupling_tag.characters
                .map((character) => (
                  <PixivDictLink
                    title={
                      character.dict_entry
                        ? character.dict_entry
                        : character.name
                    }
                    label={character.name}
                  />
                ))
                .reduce((s, x) => (
                  <>
                    {s} × {x}
                  </>
                ))}
            </span>
            <span
              css={css`
                display: inline-block;
                margin-left: 1em;
                font-size: 0.75em;
              `}
            >
              ({coupling_tag.tag.num}作品)
            </span>
          </li>
        );
      })}
    </ol>
  );
};
