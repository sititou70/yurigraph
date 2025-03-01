// https://dic.pixiv.net/a/%E6%9D%B1%E6%96%B9Project%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  // usage: target_couplings.map(addcharactor("username"))
  const addcharactor = (charactor) => (x) => ({
    ...x,
    characters: [...x.characters, { name: charactor }],
  });

  // usage: target_couplings.filter(excludeSameCharactorsCoupling)
  const excludeSameCharactorsCoupling = (x) =>
    x.characters.length === 2 && x.characters[0] !== x.characters[1];

  // add coupling synonym to target coupling from synonym table, table format like below example
  //<tr>
  //  <th><a>レイマリ</a></th>
  //  <td><a>僕の見つけた真実はレイマリ</a></td>
  //</tr>
  //...
  //usage: target_coupling.map(addSynonymCouplingTag(synonym_table))
  const addSynonymCouplingTag = (synonym_table) => {
    const synonyms = Array.from(synonym_table.querySelectorAll('tr'))
      .map((x) => ({
        tag: x.querySelector('th'),
        synonym: x.querySelector('td'),
      }))
      .filter((x) => x.tag !== null && x.synonym !== null)
      .map((x) => ({
        tags: Array.from(x.tag.querySelectorAll('a')).map((x) =>
          getDictTitleFromURL(x.href)
        ),
        synonyms: Array.from(x.synonym.querySelectorAll('a')).map((x) =>
          getDictTitleFromURL(x.href)
        ),
      }));

    return (x) => {
      const current_synonyms = x.tags
        .map((x) => synonyms.find((y) => y.tags.indexOf(x.name) !== -1))
        .filter((x) => x !== undefined)
        .reduce((s, x) => [...s, ...x.synonyms], [])
        .filter((x, i, self) => self.indexOf(x) === i)
        .map((x) => ({ name: x }));

      return { ...x, tags: [...x.tags, ...current_synonyms] };
    };
  };

  // get target coupling from table like following format
  //<tr>
  //  <th><a>ルーミア</a>×<a>大妖精</a></th>
  //  <td><a>るーだい</a></td>
  //</tr>
  //...
  const getCouplingFromTable = (table) =>
    Array.from(table.querySelectorAll('tr'))
      .map((x) => ({
        header: x.querySelector('th'),
        data: x.querySelector('td'),
      }))
      .filter((x) => x.header !== null && x.data !== null)
      .map((x) => ({
        characters: Array.from(x.header.querySelectorAll('a')).map((x) => ({
          name: getDictTitleFromURL(x.href),
        })),
        tags: Array.from(x.data.querySelectorAll('a')).map((x) => ({
          name: getDictTitleFromURL(x.href),
        })),
      }));

  //target tables
  const tables = Array.from(document.querySelectorAll('article table'));
  const target_couplings = [
    //作品別
    ...tables
      .slice(3, 37)
      .map((x) => getCouplingFromTable(x))
      .reduce((s, x) => [...s, ...x]),
    //キャラ別
    ////博麗霊夢関係
    ...getCouplingFromTable(tables[0]).map(addcharactor('博麗霊夢')),
    ////霧雨魔理沙関係
    ...getCouplingFromTable(tables[1]).map(addcharactor('霧雨魔理沙')),
    ////アリス・マーガトロイド関係
    ...getCouplingFromTable(tables[2]).map(
      addcharactor('アリス・マーガトロイド')
    ),
  ]
    .filter(excludeSameCharactorsCoupling)
    .map(
      //派生タグ
      addSynonymCouplingTag(tables[37])
    );

  copy(JSON.stringify(target_couplings));
})();
