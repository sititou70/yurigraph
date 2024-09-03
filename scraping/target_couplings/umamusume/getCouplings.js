// https://dic.pixiv.net/a/%E3%82%A6%E3%83%9E%E5%A8%98%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%93%E3%83%BB%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// https://dic.pixiv.net/a/%E5%8F%B2%E5%AE%9F%E5%A4%AB%E5%A9%A6
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const getDictTitleFromLinkText = (() => {
    const text2title = new Map(
      Array.from(document.querySelectorAll('a'))
        .filter((a) => a.href.startsWith('https://dic.pixiv.net/a/'))
        .map((a) => [
          a.innerText,
          decodeURI(a.href).replace('https://dic.pixiv.net/a/', ''),
        ])
    );

    return (text) => text2title.get(text);
  })();

  // get couplings from table that like following format
  // |☆ウオスカ / ウオダス / スカウオ|ウオッカ|ダイワスカーレット|共にチームスピカのメンバー。史実では同世代（07世代）、5回対戦した好敵手|
  // ...
  const getDictTitleFromTd = (td) => {
    const a = td.querySelector('a');
    if (a !== null) return getDictTitleFromURL(a.href);

    const title = getDictTitleFromLinkText(td.innerText);
    if (td.innerText !== '' && title !== undefined) return title;

    return null;
  };
  const getCouplingsFromTable = (table) => {
    return Array.from(table.querySelectorAll('tr'))
      .map((tr) => tr.querySelectorAll('th, td'))
      .filter(
        ([th, td1, td2]) =>
          th.querySelector('a') !== null &&
          getDictTitleFromTd(td1) !== null &&
          getDictTitleFromTd(td2) !== null
      )
      .map(([th, td1, td2]) => ({
        tags: Array.from(th.querySelectorAll('a')).map((a) => ({
          name: getDictTitleFromURL(a.href),
        })),
        characters: [
          {
            name: getDictTitleFromTd(td1),
          },
          {
            name: getDictTitleFromTd(td2),
          },
        ],
      }));
  };

  if (
    location.href ===
    'https://dic.pixiv.net/a/%E3%82%A6%E3%83%9E%E5%A8%98%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%93%E3%83%BB%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7'
  ) {
    const tables = document.querySelectorAll('#article-body table');
    const target_couplings = [
      ...getCouplingsFromTable(tables[0]),
      ...getCouplingsFromTable(tables[1]),
      ...getCouplingsFromTable(tables[2]),
      ...getCouplingsFromTable(tables[3]),
      ...getCouplingsFromTable(tables[4]),
      ...getCouplingsFromTable(tables[5]),
      ...getCouplingsFromTable(tables[6]),
      // 3人以上の組み合わせは取得しない
      ...getCouplingsFromTable(tables[11]),
    ];
    copy(JSON.stringify(target_couplings));
    return;
  }

  if (
    location.href ===
    'https://dic.pixiv.net/a/%E5%8F%B2%E5%AE%9F%E5%A4%AB%E5%A9%A6'
  ) {
    const target_couplings = getCouplingsFromTable(
      document.querySelector('table')
    );
    copy(JSON.stringify(target_couplings));
    return;
  }
})();
