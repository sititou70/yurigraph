import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// settings
const CACHE_DIR = 'TEMP_CACHE';
const INPUT_COUPLINGS_JSON = path.join(
  '..',
  process.env.TARGET_COUPLINGS_JSON as string
);
const DEST_COUPLINGS_JSON = '../src/couplings.json';

//type
export type TargetCoupling = {
  characters: string[];
  tags: { name: string }[];
};
export type Coupling = {
  characters: string[];
  tags: { name: string; num: number }[];
};
export type Couplings = Coupling[];
const compTargetCouplings = (x: TargetCoupling, y: TargetCoupling): boolean => {
  if (x.characters.length !== 2) return false;
  if (y.characters.length !== 2) return false;

  if (
    x.characters[0] === y.characters[0] &&
    x.characters[1] === y.characters[1]
  )
    return true;
  if (
    x.characters[0] === y.characters[1] &&
    x.characters[1] === y.characters[0]
  )
    return true;

  return false;
};

// main
const main = async () => {
  // ensure cache directory
  try {
    fs.mkdirSync(CACHE_DIR);
  } catch (e) {}

  const couplings: TargetCoupling[] = groupingTargetCouplings(
    JSON.parse(fs.readFileSync(INPUT_COUPLINGS_JSON).toString())
  ).filter((x) => !isSelfCoupling(x));

  let dest_couplings: Couplings = [];
  for (const coupling of couplings) {
    let tags: Coupling['tags'] = [];
    for (let tag of coupling.tags) {
      console.log('scraping tag:', tag.name);
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

const groupingTargetCouplings = (
  couplings: TargetCoupling[]
): TargetCoupling[] => {
  let left_couplings = couplings;
  let grouped_couplings: TargetCoupling[] = [];

  do {
    let group: TargetCoupling[] = [];
    let pivot = left_couplings[0];

    let prev_left_couplings = left_couplings;
    left_couplings = [];
    prev_left_couplings.forEach((x) => {
      if (compTargetCouplings(pivot, x)) {
        group.push(x);
      } else {
        left_couplings.push(x);
      }
    });

    let grouped_coupling = group.reduce((s, x) => ({
      ...s,
      tags: [...s.tags, ...x.tags],
    }));
    grouped_coupling = {
      ...grouped_coupling,
      tags: grouped_coupling.tags.filter(
        (x, i, self) => self.findIndex((y) => x.name === y.name) === i
      ),
    };

    grouped_couplings.push(grouped_coupling);
  } while (left_couplings.length !== 0);

  return grouped_couplings;
};

const isSelfCoupling = (coupling: TargetCoupling) =>
  coupling.characters[0] === coupling.characters[1];

const sleep = async (millis: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), millis));

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
