import { FC } from 'react';

export const PixivDictLink: FC<{ title: string; label?: string }> = ({
  title,
  label,
}) => (
  <a
    href={`https://dic.pixiv.net/a/${title}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {(label ?? title).replace(/\(.*\)/, '')}
  </a>
);

export const PixivTagLink: FC<{ tag: string; label?: string }> = ({
  tag,
  label,
}) => (
  <a
    href={`https://www.pixiv.net/tags/${tag}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {(label ?? tag).replace(/\(.*\)/, '')}
  </a>
);
