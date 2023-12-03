// https://dic.pixiv.net/a/%E3%81%BC%E3%81%A3%E3%81%A1%E3%83%BB%E3%81%96%E3%83%BB%E3%82%8D%E3%81%A3%E3%81%8F%21%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  // get couplings from table that like following format
  // |ぼ虹|後藤ひとり/伊地知虹夏|
  // ...
  const getCouplingsFromTable = (table) => {
    return Array.from(table.querySelectorAll('tr'))
      .filter((tr) => tr.querySelector('a') !== null)
      .map((tr) => tr.querySelectorAll('td'))
      .filter(
        ([_, characters]) => characters.querySelectorAll('a').length === 2
      )
      .map(([tag, characters]) => ({
        tags: [{ name: getDictTitleFromURL(tag.querySelector('a').href) }],
        characters: [
          {
            name: getDictTitleFromURL(characters.querySelectorAll('a')[0].href),
          },
          {
            name: getDictTitleFromURL(characters.querySelectorAll('a')[1].href),
          },
        ],
      }));
  };

  // get target couplings
  const target_couplings = getCouplingsFromTable(
    document.querySelector('#article-body > table:nth-of-type(1)')
  );
  copy(JSON.stringify(target_couplings));
})();
