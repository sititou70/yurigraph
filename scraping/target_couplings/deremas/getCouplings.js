// https://dic.pixiv.net/a/%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%E3%82%B7%E3%83%B3%E3%83%87%E3%83%AC%E3%83%A9%E3%82%AC%E3%83%BC%E3%83%AB%E3%82%BA%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // get coupling from like following table format
  // 「あい真奈」【ハンサムレディース】
  // 東郷あい × 木場真奈美
  const getCouplingsMultiRow = (table) => {
    const tags = Array.from(table.querySelectorAll('tbody > tr'))
      .filter((_, i) => i % 3 === 0)
      .map((x) =>
        Array.from(x.querySelectorAll('th > a')).map((x) => x.innerText)
      );

    const characters = Array.from(table.querySelectorAll('tbody > tr'))
      .filter((_, i) => i % 3 === 1)
      .map((x) =>
        Array.from(x.querySelectorAll('a')).map((x) => ({
          name: x.innerText,
        }))
      );

    return tags.map((_, i) => ({
      characters: characters[i],
      tags: tags[i].map((x) => ({ name: x })),
    }));
  };

  // get coupling from like following table format
  // アキレイナ　／　池袋晶葉 × 小関麗奈
  const getCouplingsSingleRow = (table) =>
    Array.from(table.querySelectorAll('tbody > tr'))
      .filter((_, i) => i % 2 === 0)
      .map((x) =>
        Array.from(x.querySelectorAll('th > a')).map((x) => x.innerText)
      )
      .map((x) => ({
        tags: x.slice(0, -2).map((x) => ({ name: x })),
        characters: x.slice(-2).map((x) => ({ name: x })),
      }));

  const couplings = [
    //公式ユニットとして登場したもの
    ...getCouplingsMultiRow(
      document.querySelector('#article-body > table:nth-of-type(1)')
    ),
    //アニメからユニット化したもの
    ...getCouplingsMultiRow(
      document.querySelector('#article-body > table:nth-of-type(2)')
    ),
    //スターライトステージで初登場のユニット
    ...getCouplingsMultiRow(
      document.querySelector('#article-body > table:nth-of-type(3)')
    ),
    //固有のユニット名が無いもの
    ...getCouplingsSingleRow(
      document.querySelector('#article-body > table:nth-of-type(4)')
    ),
    //公式媒体に登場するもの
    ...getCouplingsSingleRow(
      document.querySelector('#article-body > table:nth-of-type(5)')
    ),
    //非公式なもの
    ...getCouplingsSingleRow(
      document.querySelector('#article-body > table:nth-of-type(6)')
    ),
    //非アイドルを含むもの
    ...getCouplingsSingleRow(
      document.querySelector('#article-body > table:nth-of-type(7)')
    ),
  ];

  console.log(JSON.stringify(couplings));
})();
