// https://dic.pixiv.net/a/%E3%83%A9%E3%83%96%E3%83%A9%E3%82%A4%E3%83%96%21%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// https://dic.pixiv.net/a/%E3%83%A9%E3%83%96%E3%83%A9%E3%82%A4%E3%83%96%21%E3%82%B5%E3%83%B3%E3%82%B7%E3%83%A3%E3%82%A4%E3%83%B3%21%21%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// https://dic.pixiv.net/a/Aqours%C3%97%CE%BC%27s%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const getFullname = (name) =>
    ({
      穂乃果: '高坂穂乃果',
      絵里: '絢瀬絵里',
      ことり: '南ことり',
      海未: '園田海',
      凛: '星空凛',
      真姫: '西木野真姫',
      希: '東條希',
      花陽: '小泉花陽',
      にこ: '矢澤にこ',
      千歌: '高海千歌',
      梨子: '桜内梨子',
      果南: '松浦果南',
      ダイヤ: '黒澤ダイヤ',
      曜: '渡辺曜',
      善子: '津島善子',
      花丸: '国木田花丸',
      鞠莉: '小原鞠莉',
      ルビィ: '黒澤ルビィ',
    }[name]);

  // get couplings from table that like following format
  // |      |穂乃果  |絵里    |...
  // |穂乃果|   --   |ほのこと|...
  // |絵里  |えりほの|   --   |...
  // ...
  const getTargetCouplings = (table) => {
    const header_characters = Array.from(
      table.querySelectorAll('tr:first-child > th')
    )
      .map((x) => getFullname(x.innerText))
      .filter((x) => x !== undefined);

    const data_table_rows = Array.from(
      table.querySelectorAll('tr:not(first-child)')
    );
    return data_table_rows
      .map((row) => {
        const character = getFullname(row.querySelector('th').innerText);
        const coupling_cells = Array.from(
          row.querySelectorAll(':scope > *:not(:first-child)')
        );

        return coupling_cells
          .map((x, i) => ({
            characters: [{ name: character }, { name: header_characters[i] }],
            tags: Array.from(x.querySelectorAll('a'))
              .map((x) => ({ name: getDictTitleFromURL(x.href) }))
              .filter((x) => x.name !== ''),
          }))
          .filter((x) => x.tags.length !== 0);
      })
      .reduce((s, x) => [...s, ...x]);
  };

  // get target couplings
  const target_table = document.querySelector(
    '#article-body > table:nth-of-type(1)'
  );
  const target_couplings = getTargetCouplings(target_table);
  copy(JSON.stringify(target_couplings));
})();
