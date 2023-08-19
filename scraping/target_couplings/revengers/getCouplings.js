// https://dic.pixiv.net/a/%E6%9D%B1%E4%BA%AC%E3%80%90%E8%85%90%E3%80%91%E3%83%AA%E3%83%99%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BC%E3%82%BA
// usage: paste this script to javascript console

(() => {
  const shortNameMap = {
    タケ: '花垣武道',
    武: '花垣武道',
    ナオ: '橘直人',
    マイ: '佐野万次郎',
    ドラ: '龍宮寺堅',
    バジ: '場地圭介',
    ばじ: '場地圭介',
    ふゆ: '松野千冬',
    みつ: '三ツ谷隆',
    はち: '柴八戒',
    パー: '林田春樹',
    ペー: '林良平',
    ナホ: '河田ナホヤ',
    ソヤ: '河田ソウヤ',
    ム: '武藤泰宏',
    春: '三途春千夜',
    はる: '三途春千夜',
    三: '三途春千夜',
    キサ: '稀咲鉄太',
    稀: '稀咲鉄太',
    半: '半間修二',
    とら: '羽宮一虎',
    ココ: '九井一',
    イヌ: '乾青宗',
    たい: '柴大寿',
    イザ: '黒川イザナ',
    蘭: '灰谷蘭',
    竜: '灰谷竜胆',
    カク: '鶴蝶',
    おみ: '明司武臣',
    臣: '明司武臣',
    ワカ: '今牛若狭',
    あつ: '千堂敦',
    真: '佐野真一郎',
  };

  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const charactersFromCoupling = (text) => {
    const keyChar1 = Object.keys(shortNameMap).find((e) => text.startsWith(e));
    if (!keyChar1) {
      return [];
    }
    const keyChar2 = Object.keys(shortNameMap).find((e) =>
      text.replace(keyChar1, '').endsWith(e)
    );
    if (!keyChar2) {
      return [];
    }
    return [shortNameMap[keyChar1], shortNameMap[keyChar2]].sort();
  };

  let couplingTags = {};
  let targetTables = Array.from(document.querySelectorAll('table'));
  targetTables
    .map((table) => Array.from(table.querySelectorAll('td')))
    .forEach((tds) => {
      tds.forEach((td) => {
        td.querySelectorAll('a').forEach((a) => {
          const characters = charactersFromCoupling(a.text);
          if (characters.length < 2) {
            return true;
          }
          if (!couplingTags[characters.join('_')]) {
            couplingTags[characters.join('_')] = [getDictTitleFromURL(a.href)];
          } else {
            couplingTags[characters.join('_')].push(
              getDictTitleFromURL(a.href)
            );
          }
        });
      });
    });

  const result = Object.keys(couplingTags).map((k) => {
    return {
      characters: k.split('_').map((e) => {
        return { name: e };
      }),
      tags: couplingTags[k].map((e) => {
        return { name: e };
      }),
    };
  });

  console.log(JSON.stringify(result));
})();
