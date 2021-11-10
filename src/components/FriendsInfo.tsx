import { FC } from 'react';
import { Character, Coupling, Couplings } from 'yurigraph-scraping';
import coupling_json from '../couplings.json';
import { PixivDictLink, PixivTagLink } from './pixiv-utils';

const friends = ((): { [name: string]: Coupling[] } => {
  const couplings: Couplings = coupling_json;
  const character_names: string[] = couplings
    .map((x) => x.characters.map((x) => x.name))
    .reduce((s, x) => [...s, ...x])
    .filter((x, i, self) => self.indexOf(x) === i);
  return character_names
    .map((x) => ({
      [x]: couplings.filter(
        (y) => y.characters.find((z) => z.name === x) !== undefined
      ),
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
        .map((x) => ({
          ...x,
          num: x.tags.map((x) => x.num).reduce((s, x) => (s > x ? s : x)),
        }))
        .sort((x, y) => y.num - x.num)
        .map((x) => {
          const friend = x.characters.find((x) => x.name !== name) as Character;

          return (
            <li key={x.tags[0].name}>
              {
                <PixivDictLink
                  title={friend.dict_entry ? friend.dict_entry : friend.name}
                  text={friend.name}
                  key={x.tags[0].name}
                />
              }
              <ul>
                {x.tags
                  .sort((x, y) => y.num - x.num)
                  .map((x) => (
                    <li key={x.name}>
                      <PixivTagLink title={x.name} />({x.num}作品)
                    </li>
                  ))}
              </ul>
            </li>
          );
        })}
    </ol>
  );
};

export default FriendsInfo;
