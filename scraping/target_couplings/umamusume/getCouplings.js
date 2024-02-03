// https://dic.pixiv.net/a/%E3%82%A6%E3%83%9E%E5%A8%98%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%93%E3%83%BB%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  // get couplings from table that like following format
  // |☆ウオスカ / ウオダス / スカウオ|ウオッカ|ダイワスカーレット|共にチームスピカのメンバー。史実では同世代（07世代）、5回対戦した好敵手|
  // ...
  const getCouplingsFromTable = (table) => {
    return Array.from(table.querySelectorAll('tr'))
      .map((tr) => tr.querySelectorAll('th, td'))
      .filter(
        ([th, td1, td2]) =>
          th.querySelector('a') !== null &&
          td1.querySelector('a') !== null &&
          td2.querySelector('a') !== null
      )
      .map(([th, td1, td2]) => ({
        tags: Array.from(th.querySelectorAll('a')).map((a) => ({
          name: getDictTitleFromURL(a.href),
        })),
        characters: [
          {
            name: getDictTitleFromURL(td1.querySelector('a').href),
          },
          {
            name: getDictTitleFromURL(td2.querySelector('a').href),
          },
        ],
      }));
  };

  const tables = document.querySelectorAll(
    '#article-body > #table-wrapper > table'
  );
  const target_couplings = [
    ...getCouplingsFromTable(tables[0]),
    ...getCouplingsFromTable(tables[1]),
    ...getCouplingsFromTable(tables[2]),
    ...getCouplingsFromTable(tables[3]),
    ...getCouplingsFromTable(tables[4]),
    ...getCouplingsFromTable(tables[5]),
    ...getCouplingsFromTable(tables[6]),
    ...getCouplingsFromTable(tables[7]),
    // 3人以上の組み合わせは取得しない
    ...getCouplingsFromTable(tables[12]),
  ];
  copy(JSON.stringify(target_couplings));
})();
