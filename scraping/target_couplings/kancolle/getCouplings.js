// https://dic.pixiv.net/a/%E8%89%A6%E9%9A%8A%E3%81%93%E3%82%8C%E3%81%8F%E3%81%97%E3%82%87%E3%82%93%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  // get target couplings from following table format
  //|カップリング名|前者の名前|後者の名前|...|
  //|金榛|金剛|榛名|...|
  const getTargetCouplings = (table) =>
    Array.from(table.querySelectorAll('tr'))
      .map((x) => Array.from(x.querySelectorAll('td')))
      .filter((x) => x.length !== 0)
      .map((x) => ({
        characters: [x[1].querySelector('a'), x[2].querySelector('a')].map(
          (x) => ({ name: getDictTitleFromURL(x.href) })
        ),
        tags: Array.from(x[0].querySelectorAll('a'))
          .map((x) => getDictTitleFromURL(x.href))
          .map((x) => ({ name: x })),
      }));

  const target_couplings = [
    ...Array.from(document.querySelectorAll('div#article-table > table'))
      .filter(
        (table) => table.querySelectorAll('tr:first-of-type > th').length === 4
      )
      .map((x) => getTargetCouplings(x))
      .reduce((s, x) => [...s, ...x]),
  ];

  copy(JSON.stringify(target_couplings));
})();
