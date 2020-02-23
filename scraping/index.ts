import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// settings
const CACHE_DIR = 'TEMP_CACHE';
const INPUT_COUPLINGS_JSON = path.join(
  '../',
  process.env.TARGET_COUPLINGS_JSON as string
);
const DEST_COUPLINGS_JSON = '../frontend/src/couplings.json';

//type
export type TargetCouplings = {
  characters: string[];
  tags: { name: string }[];
};
export type Coupling = {
  characters: string[];
  tags: { name: string; num: number }[];
};
export type Couplings = Coupling[];

// main
const main = async () => {
  // ensure cache directory
  try {
    fs.mkdirSync(CACHE_DIR);
  } catch (e) {}

  const couplings: TargetCouplings[] = JSON.parse(
    fs.readFileSync(INPUT_COUPLINGS_JSON).toString()
  );

  let dest_couplings: Couplings = [];
  for (const coupling of couplings) {
    let tags: Coupling['tags'] = [];
    for (let tag of coupling.tags) {
      tags.push({ name: tag.name, num: await getNumsFromTag(tag.name) });
    }

    dest_couplings = [
      ...dest_couplings,
      {
        ...coupling,
        tags,
      },
    ];
  }

  fs.writeFileSync(DEST_COUPLINGS_JSON, JSON.stringify(dest_couplings));
};

const sleep = async (milis: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), milis));

const getNumsFromTag = async (tag: string): Promise<number> => {
  const cache_file_path = path.join(CACHE_DIR, `/nums_${tag}`);
  try {
    // return num if cache is exist
    return parseInt(fs.readFileSync(cache_file_path).toString());
  } catch (e) {}

  await sleep(3000);

  const url: string = `https://www.pixiv.net/tags/${encodeURIComponent(tag)}/`;
  const row = await fetch(url);
  const html = await row.text();
  const num = getNum(html, 'イラスト') + getNum(html, '小説');

  // caching num
  fs.writeFileSync(cache_file_path, num);
  return num;
};

const getNum = (html: string, type: string): number => {
  const regex = new RegExp(`(\\d+)件の${type}`);
  const match = html.match(regex);
  if (match === null) return 0;
  return parseInt(match[1]);
};

main();
