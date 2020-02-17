import React, { FC } from 'react';

export const PixivDictLink: FC<{ name: string }> = ({ name }) => (
  <a
    href={`https://dic.pixiv.net/a/${name}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {name}
  </a>
);

export const PixivTagLink: FC<{ name: string }> = ({ name }) => (
  <a
    href={`https://www.pixiv.net/tags/${name}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {name}
  </a>
);
