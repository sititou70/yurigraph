import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, IconButton, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import theme from '../theme';
import { nav_open } from './recoil';

const repos = process.env.REACT_APP_REPOS_JSONL?.split('\n').map((x) =>
  JSON.parse(x)
) as { content_name: string; repo: string }[];

// components
export const Nav = () => {
  const [open, setOpen] = useRecoilState(nav_open);

  return (
    <>
      <nav
        css={css`
          display: flex;
          padding: 0 ${theme.px.grid()} 0 ${theme.px.grid(0.5)};
          align-items: center;
          column-gap: ${theme.px.grid(0.5)};
          background: ${theme.colors.base};
          box-shadow: 0 0 ${theme.px.grid()} #0002;
          // prettier-ignore
          border-radius: 0 ${theme.px.border_radius()} ${theme.px.border_radius()};
        `}
      >
        <IconButton aria-label="メニューを開く" onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        <a href="#カップリングランキング" onClick={() => setOpen(false)}>
          カップリングランキング
        </a>
      </nav>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div
          css={css`
            position: sticky;
            top: 0;
            display: block;
            padding: ${theme.px.grid(0.5)};
            text-align: right;
            background-color: ${theme.colors.base};
            border-bottom: 1px solid ${theme.colors.border};
            z-index: 2;
          `}
        >
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <div
          css={css`
            padding: ${theme.px.grid()};

            hr {
              margin: ${theme.px.grid()} 0;
            }

            a {
              display: flex;
              align-items: center;

              svg {
                color: ${theme.colors.text};
              }
            }
          `}
        >
          <a href="#カップリングランキング" onClick={() => setOpen(false)}>
            <EmojiEventsIcon />
            カップリングランキング
          </a>

          <Divider
            css={css`
              border-color: ${theme.colors.border};
            `}
          />

          <Typography component="h2" variant="h6">
            他の作品
          </Typography>
          <ul>
            {repos
              .filter(
                ({ content_name }) =>
                  content_name !== process.env.REACT_APP_CONTENT_NAME
              )
              .map(({ content_name, repo }) => (
                <li key={repo}>
                  <a
                    href={`https://sititou70.github.io/${repo
                      .replace('git@github.com:sititou70/', '')
                      .replace('.git', '')}/`}
                  >
                    {content_name}
                  </a>
                </li>
              ))}
          </ul>

          <Divider
            css={css`
              border-color: ${theme.colors.border};
            `}
          />

          <a
            href="https://github.com/sititou70/yurigraph"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            ソースコード
          </a>
        </div>
      </Drawer>
    </>
  );
};
