import React, { FC } from 'react';
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
const PixivDictLink: FC<{ name: string }> = ({ name }) => (
  <a
    href={`https://dic.pixiv.net/a/${name}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {name}
  </a>
);

const PixivTagLink: FC<{ tag: string; title: string }> = ({ tag, title }) => (
  <a
    href={`https://www.pixiv.net/tags/${tag}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {title}
  </a>
);

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
                  <PixivTagLink
                    tag={x.name}
                    title={`${x.name}(${x.num}作品)`}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ol>
  );
};

export default FriendsInfo;
