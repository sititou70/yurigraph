// https://dic.pixiv.net/a/BanG_Dream%21%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  let characterDictTitles = {};
  let result = [];

  const tables = document.querySelectorAll('article table');
  [
    tables[0],
    tables[1],
    tables[2],
    tables[3],
    tables[4],
    tables[5],
    tables[6],
    tables[7],
    tables[8],
    tables[9],
  ].forEach((table) => {
    Array.from(table.querySelectorAll('tr'))
      .map((tr) => Array.from(tr.querySelectorAll('td')))
      .filter((tds) => tds.length !== 0)
      .forEach((tds) => {
        tds[1].querySelectorAll('a').forEach((a) => {
          if (!characterDictTitles[a.text]) {
            characterDictTitles[a.text] = getDictTitleFromURL(a.href);
          }
        });
        result.push({
          characters: tds[1].innerText.split('、').map((name) => ({
            name: characterDictTitles[name] ? characterDictTitles[name] : name,
          })),
          tags: [tds[0].querySelector('a'), tds[2].querySelector('a')]
            .filter((a) => a !== null)
            .map((a) => ({ name: getDictTitleFromURL(a.href) })),
        });
      });
  });

  copy(JSON.stringify(result));
})();
