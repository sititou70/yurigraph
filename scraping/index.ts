import fs from 'fs';
import fetch from 'node-fetch';

const main = async () => {
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
  new Promise(resolve => setTimeout(resolve, milis));

const getNumsFromTag = async (tag: string): Promise<number> => {
  const url: string = `https://www.pixiv.net/tags/${encodeURIComponent(tag)}/`;
  const row = await fetch(url);
  const text = await row.text();
  const match = text.match(/(\d+)件のイラスト、(\d+)件の小説/);
  if (match === null) return 0;
  const illust_num = parseInt(match[1]);
  const novel_num = parseInt(match[2]);
  return illust_num + novel_num;
};

main();
