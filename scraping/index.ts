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
    let nums = [];
    for (const tag of cup.tags) {
      nums.push(getNumsFromTag(tag));
      sleep(3000);
    }
  }

  const num = await getNumsFromTag('ゆきまこ');
  console.log(num);
};

const sleep = async (milis: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), milis));

const getNumsFromTag = async (tag: string): Promise<number> => {
  const cache_file_path = path.join(CACHE_DIR, `/nums_${tag}`);
  try {
    // return num if cache is exist
    return parseInt(fs.readFileSync(cache_file_path).toString());
  } catch (e) {}

  const url: string = `https://www.pixiv.net/tags/${encodeURIComponent(tag)}/`;
  const row = await fetch(url);
  const text = await row.text();
  const match = text.match(/(\d+)件のイラスト、(\d+)件の小説/);
  if (match === null) return 0;
  const illust_num = parseInt(match[1]);
  const novel_num = parseInt(match[2]);
  const num = illust_num + novel_num;

  // caching num
  fs.writeFileSync(cache_file_path, num);
  return num;
};

main();
