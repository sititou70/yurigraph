// https://dic.pixiv.net/a/%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2%E3%81%AE%E4%BA%BA%E5%90%8D%E3%83%BB%E6%84%9B%E7%A7%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
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

  const characters = [
    // 人名あり
    document.querySelector('#article-body > table:nth-child(20)'),
    // 人名なし
    document.querySelector('#article-body > table:nth-child(23)'),
  ]
    .map((x) => getCharactersFromTable(x))
    .reduce((s, x) => [...s, ...x]);

  console.log(JSON.stringify(characters));
})();
