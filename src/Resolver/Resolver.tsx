import { css } from '@emotion/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import { Checkbox, Drawer, FormControlLabel, IconButton } from '@mui/material';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import theme from '../theme';
import { Prioritizer } from './Prioritizer';
import { resolver_enable, resolver_prioritizer_open } from './recoil';

export const Resolver: FC = () => {
  const [enable, setEnable] = useRecoilState(resolver_enable);
  const [prioritizer_open, setPrioritizerOpen] = useRecoilState(
    resolver_prioritizer_open
  );

  return (
    <div
      css={css`
        padding: 0 ${theme.px.grid()};
        background: ${theme.colors.base};
        box-shadow: 0 0 ${theme.px.grid()} #0002;
        border-radius: ${theme.px.border_radius()} 0 0
          ${theme.px.border_radius()};
      `}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={enable}
            onChange={(e) => setEnable(e.target.checked)}
          />
        }
        label="1対1に解決"
      />

      <IconButton
        disabled={!enable}
        aria-label="1対1解決の設定を開く"
        onClick={() => setPrioritizerOpen(true)}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="right"
        open={prioritizer_open}
        css={css`
          .MuiPaper-root {
            background: ${theme.colors.base};
            box-shadow: 0 0 ${theme.px.grid()} #0002;
            overscroll-behavior: contain;
          }
        `}
      >
        <div
          css={css`
            position: sticky;
            top: 0;
            display: block;
            padding: ${theme.px.grid(0.5)};
            background-color: ${theme.colors.base};
            border-bottom: 1px solid ${theme.colors.border};
            z-index: 2;
          `}
        >
          <IconButton
            onClick={() => {
              setPrioritizerOpen(false);
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        {prioritizer_open && <Prioritizer />}
      </Drawer>
    </div>
  );
};
