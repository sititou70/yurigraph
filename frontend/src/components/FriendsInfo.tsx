import React, { FC } from 'react';
import { PixivDictLink, PixivTagLink } from './pixiv-utils';
import coupling_json from '../couplings.json';
import { Couplings, Coupling } from 'deregraph-scraping';

const friends = ((): { [name: string]: Coupling[] } => {
  const couplings: Couplings = coupling_json;
  const characters: string[] = couplings
    .map(x => x.characters)
    .reduce((s, x) => [...s, ...x])
    .filter((x, i, self) => self.indexOf(x) === i);
  return characters
    .map(x => ({
      [x]: couplings.filter(y => y.characters.indexOf(x) !== -1),
    }))
    .reduce((s, x) => ({ ...s, ...x }));
})();

// components
export const FriendsInfo: FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  if (friends[name] === undefined) return null;
  return (
    <ol className={className}>
      {friends[name]
        .map(x => ({
          ...x,
          num: x.tags.map(x => x.num).reduce((s, x) => (s > x ? s : x)),
        }))
        .sort((x, y) => y.num - x.num)
        .map(x => (
          <li key={x.tags[0].name}>
            {
              <PixivDictLink
                name={x.characters.find(x => x !== name) as string}
                key={x.tags[0].name}
              />
            }
            <ul>
              {x.tags.map(x => (
                <li key={x.name}>
                  <PixivTagLink name={x.name} />({x.num}作品)
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ol>
  );
};

export default FriendsInfo;
