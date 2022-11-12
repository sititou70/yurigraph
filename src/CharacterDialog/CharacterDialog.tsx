import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { FC, useId } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Character, Coupling } from 'yurigraph-scraping';
import { couplings } from '../couplings';
import { PixivDictLink, PixivTagLink } from '../PixivUtils/PixivUtils';
import theme from '../theme';
import { character_dialog_name, character_dialog_open } from './recoil';

const name2character: Map<string, Character> = new Map(
  couplings.flatMap((coupling) =>
    coupling.characters.map((character) => [character.name, character])
  )
);

const name2couplings = new Map<string, Coupling[]>();
couplings.forEach((coupling) =>
  coupling.characters.forEach((character) =>
    name2couplings.set(character.name, [])
  )
);
couplings.forEach((coupling) =>
  coupling.characters.forEach((character) => {
    const couplings = name2couplings.get(character.name);
    if (couplings === undefined) return;
    name2couplings.set(character.name, [...couplings, coupling]);
  })
);

export const CharacterDialog: FC = () => {
  const [open, setOpen] = useRecoilState(character_dialog_open);
  const name = useRecoilValue(character_dialog_name);

  const character = name && name2character.get(name);
  const couplings = name && name2couplings.get(name);

  const id = useId();

  return (
    <Dialog
      open={open}
      aria-labelledby={id}
      fullWidth={true}
      onClose={() => setOpen(false)}
    >
      <DialogTitle
        id={id}
        css={css`
          position: sticky;
          top: 0;
          display: flex;
          align-items: center;
          background: #fff;
          border-bottom: 1px solid ${theme.colors.border};
        `}
      >
        <div
          css={css`
            flex: 1 0;
          `}
        >
          {character && (
            <PixivDictLink
              title={
                character.dict_entry ? character.dict_entry : character.name
              }
              label={character.name}
            />
          )}
          のカップリング一覧
        </div>
        <IconButton
          aria-label="閉じる"
          onClick={() => setOpen(false)}
          css={css`
            flex: 0 0;
            margin-left: auto;
          `}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <div
        css={css`
          padding: ${theme.px.grid(0.5)};
        `}
      >
        <ol>
          {couplings &&
            couplings
              .map((x) => ({
                ...x,
                num: x.tags.map((x) => x.num).reduce((s, x) => (s > x ? s : x)),
              }))
              .sort((x, y) => y.num - x.num)
              .map((x) => {
                const friend = x.characters.find(
                  (x) => x.name !== name
                ) as Character;

                return (
                  <li key={x.tags[0].name}>
                    {
                      <PixivDictLink
                        title={
                          friend.dict_entry ? friend.dict_entry : friend.name
                        }
                        label={friend.name}
                        key={x.tags[0].name}
                      />
                    }
                    <ul>
                      {x.tags
                        .sort((x, y) => y.num - x.num)
                        .map((x) => (
                          <li key={x.name}>
                            <PixivTagLink tag={x.name} />({x.num}作品)
                          </li>
                        ))}
                    </ul>
                  </li>
                );
              })}
        </ol>
      </div>
    </Dialog>
  );
};
