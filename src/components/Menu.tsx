import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import theme from '../styles/theme';

const repos = process.env.REACT_APP_REPOS_JSONL?.split('\n').map((x) =>
  JSON.parse(x)
) as { content_name: string; repo: string }[];

// components
export const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Root>
      <IconButton aria-label="メニューを開く" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <DrawerRoot>
          <div className="drawer-header">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="content">
            <Typography variant="h2">他の作品</Typography>
            <ul>
              {repos
                .filter(
                  ({ content_name }) =>
                    content_name !== process.env.REACT_APP_CONTENT_NAME
                )
                .map(({ content_name, repo }) => (
                  <li>
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

            <Divider />

            <List>
              <ListItem disablePadding>
                <a
                  href="#カップリングランキング"
                  onClick={() => setOpen(false)}
                >
                  <EmojiEventsIcon />
                  カップリングランキング
                </a>
              </ListItem>
              <ListItem disablePadding>
                <a
                  href="https://github.com/sititou70/yurigraph"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  ソースコード
                </a>
              </ListItem>
            </List>
          </div>
        </DrawerRoot>
      </Drawer>

      <Typography variant="h1">{process.env.REACT_APP_APP_NAME}</Typography>
    </Root>
  );
};

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 0 ${theme.px.grid()} 0 ${theme.px.grid(0.5)};
  align-items: center;
  column-gap: ${theme.px.grid(0.5)};
  background: ${theme.colors.base};
  box-shadow: 0 0 ${theme.px.grid()} #0002;
  border-radius: 0 ${theme.px.border_radius()} ${theme.px.border_radius()};

  > h1 {
    font-size: 1rem;
  }
`;

const DrawerRoot = styled.div`
  .drawer-header {
    position: sticky;
    top: 0;
    display: block;
    padding: ${theme.px.grid(0.5)};
    text-align: right;
    background-color: ${theme.colors.base};
    border-bottom: 1px solid ${theme.colors.border};
    z-index: 2;
  }

  .content {
    padding: ${theme.px.grid()};

    h2 {
      margin-top: ${theme.px.grid(0.5)};
      font-size: 1.2rem;
    }

    hr {
      border-color: ${theme.colors.border};
    }

    ul {
      margin-top: ${theme.px.grid(0.5)};

      li > a {
        display: flex;
        align-items: center;

        svg {
          color: ${theme.colors.text};
        }
      }
    }
  }
`;

export default Menu;
