import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// settings
const CACHE_DIR = 'TEMP_CACHE';

// main
const main = async () => {
  // ensure cache directory
  try {
    fs.mkdirSync(CACHE_DIR);
  } catch (e) {}

  const file = fs.readFileSync('coupling.json');
  const json = JSON.parse(file.toString());
  for (const cup of json) {
    const cups = [];
    for (let tag of cup.tags) {
      cups.push({
        num: await getNumsFromTag(tag),
        tag,
      });
    }
    const max_tag = cups.reduce((s, x) => (s.num > x.num ? s : x));
    console.log(max_tag);
  }
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
