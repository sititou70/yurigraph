import { FC } from 'react';

export const PixivDictLink: FC<{ title: string; text?: string }> = ({
  title,
  text,
}) => (
  <a
    href={`https://dic.pixiv.net/a/${title}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {(text ? text : title).replace(/\(.*\)/, '')}
  </a>
);

export const PixivTagLink: FC<{ title: string; text?: string }> = ({
  title,
  text,
}) => (
  <a
    href={`https://www.pixiv.net/tags/${title}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {(text ? text : title).replace(/\(.*\)/, '')}
  </a>
);
