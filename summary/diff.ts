import fs from 'fs';

if (process.argv.length < 4) {
  console.error('usage: npx ts-node OLD_LOGFILE NEW_LOGFILE');
  process.exit(1);
}

type Log = {
  tag_name: string;
  num: number;
}[];

type DiffRow = {
  tag_name: string;
  new_num: number;
  new_rank: number;
  old_rank?: number;
  old_num?: number;
};

const main = () => {
  const old_log = (
    JSON.parse(fs.readFileSync(process.argv[2]).toString()) as Log
  ).sort((x, y) => y.num - x.num);
  const new_log = (
    JSON.parse(fs.readFileSync(process.argv[3]).toString()) as Log
  ).sort((x, y) => y.num - x.num);

  const old_tag2num = new Map<string, number>(
    old_log.map((x, i) => [x.tag_name, x.num])
  );
  const old_tag2rank = new Map<string, number>(
    old_log.map((x, i) => [x.tag_name, i + 1])
  );
  const new_tag2rank = new Map<string, number>(
    new_log.map((x, i) => [x.tag_name, i + 1])
  );

  const getDiffRow = (new_logrow: Log[0]): DiffRow => {
    const new_rank = new_tag2rank.get(new_logrow.tag_name);
    const old_rank = old_tag2rank.get(new_logrow.tag_name);
    const old_num = old_tag2num.get(new_logrow.tag_name);

    return {
      tag_name: new_logrow.tag_name,
      new_num: new_logrow.num,
      new_rank: new_rank ? new_rank : -1,
      old_rank,
      old_num,
    };
  };

  const printDiffRow = (diff: DiffRow) => {
    const rank_diff = (() => {
      if (!diff.old_rank) return 'new';
      if (diff.new_rank === diff.old_rank) return '→0';
      if (diff.new_rank < diff.old_rank)
        return `↑${diff.old_rank - diff.new_rank}`;
      if (diff.new_rank > diff.old_rank)
        return `↓${diff.new_rank - diff.old_rank}`;
    })();

    const num_diff = (() => {
      if (!diff.old_num) return '-';
      if (diff.new_num === diff.old_num) return '±0';
      if (diff.new_num > diff.old_num) return `+${diff.new_num - diff.old_num}`;
      if (diff.new_num < diff.old_num) return `-${diff.old_num - diff.new_num}`;
    })();

    console.log(
      `|${diff.new_rank} (${rank_diff})|[${diff.tag_name}](https://www.pixiv.net/tags/${diff.tag_name})|${diff.new_num} (${num_diff})|`
    );
  };

  // print result
  console.log('# all');
  new_log.map(getDiffRow).forEach(printDiffRow);

  console.log('\n\n# rank up');
  new_log
    .map(getDiffRow)
    .filter((x): x is Required<DiffRow> => !!x.old_rank)
    .filter((x) => x.new_rank < x.old_rank)
    .filter((x) => x.new_num > 100)
    .sort((x, y) => y.old_rank - y.new_rank - (x.old_rank - x.new_rank))
    .forEach(printDiffRow);

  console.log('\n\n# rank down');
  new_log
    .map(getDiffRow)
    .filter((x): x is Required<DiffRow> => !!x.old_rank)
    .filter((x) => x.new_rank > x.old_rank)
    .filter((x) => x.new_num > 100)
    .sort((x, y) => x.old_rank - x.new_rank - (y.old_rank - y.new_rank))
    .forEach(printDiffRow);

  console.log('\n\n# new');
  new_log
    .map(getDiffRow)
    .filter((x) => !x.old_rank)
    .forEach(printDiffRow);
};
main();
