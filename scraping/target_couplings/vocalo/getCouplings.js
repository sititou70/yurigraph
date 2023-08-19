// https://dic.pixiv.net/a/VOCALOID%E3%82%B3%E3%83%B3%E3%83%93%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// https://dic.pixiv.net/a/VOICEROID%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  // utils
  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const characters = [
    '徵羽摩柯',
    '乐正绫',
    '乐正龙牙',
    'AZUKI',
    'Append',
    'Avanna',
    'BIG-AL',
    'Bruno',
    'CUL',
    'CYBER_DIVA',
    'CYBER_SONGMAN',
    'Chika',
    'Chris',
    'Clara',
    'Fukase',
    'GUMI',
    'IA',
    'KAITO',
    'Kaori',
    'Ken',
    'LEON',
    'LOLA',
    'LUMi',
    'Lily',
    'MAIKA',
    'MATCHA',
    'MAYU',
    'MEIKO',
    'MIRIAM',
    'Mac音ナナ',
    'Megpoid',
    'Mew',
    'Oliver',
    'ONE',
    'PRIMA',
    'Rana',
    'Ruby',
    'SF-A2',
    'SONIKA',
    'Sachiko',
    'SeeU',
    'SweetAnn',
    'TONIO',
    'UNI',
    'VY1',
    'VY2',
    'YOHIOloid',
    'ZOLA_PROJECT',
    'kokone(心響)',
    'miki',
    'v_flower',
    'v4_flower',
    'がくっぽいど',
    'すずきつづみ',
    'ついなちゃん',
    'アルスロイド',
    'ガチャッポイド',
    'ギャラ子',
    'タカハシ(CeVIO)',
    'ボカロ小学生',
    'ボカロ先生',
    'マクネナナ',
    'ミライ小町',
    'メグッポイド',
    'メルリ',
    'ユニティちゃん',
    'リュウト',
    '杏音鳥音',
    '伊織弓鶴',
    '音街ウナ',
    '歌愛ユキ',
    '歌手音ピコ',
    '吉田くん',
    '鏡音リン',
    '鏡音レン',
    '琴葉葵',
    '琴葉茜',
    '結月ゆかり',
    '結月ゆかりの双子の弟',
    '月読アイ',
    '月読ショウタ',
    '弦巻マキ',
    '言和',
    '桜乃そら',
    '巡音ルカ',
    '初音ミク',
    '心華',
    '神威がくぽ',
    '水奈瀬コウ',
    '京町セイカ',
    '星尘',
    '蒼姫ラピス',
    '兎眠りおん',
    '東北きりたん',
    '東北ずん子',
    '東北イタコ',
    '猫村いろは',
    '氷山キヨテル',
    '墨清弦',
    '夢眠ネム',
    '鳴花ヒメ・ミコト',
    '洛天依',
    '紲星あかり',
  ];

  const getFullname = (name) => characters.find((x) => x.indexOf(name) !== -1);

  // get couplings from table that like following format
  // |     |KAITO   |レン    |...
  // |MEIKO|カイメイ|レンメイ|...
  // |ミク |カイミク|レンミク|...
  // ...
  const getTableCouplings = (table) => {
    const header_characters = Array.from(
      table.querySelectorAll('tr:first-child > th')
    )
      .map((x) => getFullname(x.innerText))
      .filter((x) => x !== undefined);

    const data_table_rows = Array.from(
      table.querySelectorAll('tr:not(:first-child)')
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

  // get couplings list that like following format
  // * ゆづきず、きずゆか(結月ゆかり×紲星あかり)
  // ...
  const list_tag_splitter = /、/;
  const getListCouplings = (list) =>
    Array.from(list.querySelectorAll('li'))
      .map((x) => x.textContent.match(/(.+)\((.+)\)/))
      .filter((x) => x !== null)
      .map((x) => ({
        characters: x[2].split('×').map((x) => ({ name: getFullname(x) })),
        tags: x[1].split(list_tag_splitter).map((x) => ({ name: x })),
      }))
      .filter((x) => x.characters.length === 2);

  // get target couplings
  let target_couplings;
  if (
    location.href ===
    'https://dic.pixiv.net/a/VOCALOID%E3%82%B3%E3%83%B3%E3%83%93%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7'
  ) {
    const target_table_selectors = [
      '#article-body > table:nth-of-type(1)',
      '#article-body > table:nth-of-type(3)',
      '#article-body > table:nth-of-type(5)',
    ];
    target_couplings = target_table_selectors
      .map((x) => getTableCouplings(document.querySelector(x)))
      .reduce((s, x) => [...s, ...x]);
  }
  if (
    location.href ===
    'https://dic.pixiv.net/a/VOICEROID%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7'
  ) {
    const target_list_selectors = [
      '#article-body > ul:nth-of-type(1)',
      '#article-body > ul:nth-of-type(2)',
      '#article-body > ul:nth-of-type(3)',
      '#article-body > ul:nth-of-type(4)',
      '#article-body > ul:nth-of-type(5)',
      '#article-body > ul:nth-of-type(6)',
      '#article-body > ul:nth-of-type(7)',
    ];
    target_couplings = target_list_selectors
      .map((x) => getListCouplings(document.querySelector(x)))
      .reduce((s, x) => [...s, ...x]);
  }
  console.log(JSON.stringify(target_couplings));
})();
