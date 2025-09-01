// https://dic.pixiv.net/history/view/6451043
// usage: paste this script to javascript console

(() => {
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  // get countories and characters mapping from following table
  // |日|日本|本田菊|
  // ...
  const getCharactersFromRow = (row) => {
    const cells = Array.from(row.querySelectorAll(':scope > *'));
    return {
      short_country_name: cells[0].innerText,
      country_name: cells[1].innerText,
      name: getDictTitleFromURL(cells[2].querySelector('a').href),
    };
  };
  const getCharactersFromTable = (table) => {
    const rows = Array.from(table.querySelectorAll('tr'));
    return rows.map(getCharactersFromRow);
  };

  const tables = document.querySelectorAll('article table');
  const characters = [
    // 人名あり
    tables[2],
    // 人名なし
    tables[3],
  ]
    .map((x) => getCharactersFromTable(x))
    .reduce((s, x) => [...s, ...x]);

  copy(JSON.stringify(characters));
})();
