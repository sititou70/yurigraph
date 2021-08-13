// https://dic.pixiv.net/a/%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%93%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7
// https://dic.pixiv.net/a/%E8%85%90%E5%90%91%E3%81%91%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2
// usage: paste this script to javascript console

(() => {
  const characters = [
    {
      short_country_name: '北伊',
      country_name: '北イタリア',
      name: 'フェリシアーノ・ヴァルガス',
    },
    {
      short_country_name: '南伊',
      country_name: '南イタリア',
      name: 'ロヴィーノ・ヴァルガス',
    },
    {
      short_country_name: '独',
      country_name: 'ドイツ',
      name: 'ルートヴィッヒ',
    },
    {
      short_country_name: '普',
      country_name: 'プロイセン',
      name: 'ギルベルト・バイルシュミット',
    },
    { short_country_name: '日', country_name: '日本', name: '本田菊' },
    {
      short_country_name: '米',
      country_name: 'アメリカ',
      name: 'アルフレッド・F・ジョーンズ',
    },
    {
      short_country_name: '英',
      country_name: 'イギリス',
      name: 'アーサー・カークランド',
    },
    {
      short_country_name: '仏',
      country_name: 'フランス',
      name: 'フランシス・ボヌフォワ',
    },
    { short_country_name: '中', country_name: '中国', name: '王耀' },
    {
      short_country_name: '露',
      country_name: 'ロシア',
      name: 'イヴァン・ブラギンスキ',
    },
    {
      short_country_name: '加',
      country_name: 'カナダ',
      name: 'マシュー・ウィリアムズ',
    },
    {
      short_country_name: '西',
      country_name: 'スペイン',
      name: 'アントーニョ・ヘルナンデス・カリエド',
    },
    {
      short_country_name: '瑞',
      country_name: 'スイス',
      name: 'バッシュ・ツヴィンクリ',
    },
    {
      short_country_name: '墺',
      country_name: 'オーストリア',
      name: 'ローデリヒ・エーデルシュタイン',
    },
    {
      short_country_name: '洪',
      country_name: 'ハンガリー',
      name: 'エリザベータ・ヘーデルヴァーリ',
    },
    {
      short_country_name: '辺',
      country_name: 'ベラルーシ',
      name: 'ナターリヤ・アルロフスカヤ',
    },
    {
      short_country_name: '波',
      country_name: 'ポーランド',
      name: 'フェリクス・ウカシェヴィチ',
    },
    {
      short_country_name: '立',
      country_name: 'リトアニア',
      name: 'トーリス・ロリナイティス',
    },
    {
      short_country_name: '拉',
      country_name: 'ラトビア',
      name: 'ライヴィス・ガランテ',
    },
    {
      short_country_name: '愛',
      country_name: 'エストニア',
      name: 'エドァルド・フォンヴォック',
    },
    {
      short_country_name: '芬',
      country_name: 'フィンランド',
      name: 'ティノ・ヴァイナマイネン',
    },
    {
      short_country_name: '典',
      country_name: 'スウェーデン',
      name: 'ベールヴァルド・オキセンスシェルナ',
    },
    {
      short_country_name: '海',
      country_name: 'シーランド',
      name: 'ピーター・カークランド',
    },
    {
      short_country_name: '希',
      country_name: 'ギリシャ',
      name: 'ヘラクレス・カルプシ',
    },
    {
      short_country_name: '土',
      country_name: 'トルコ',
      name: 'サディク・アドナン',
    },
    {
      short_country_name: '埃',
      country_name: 'エジプト',
      name: 'グプタ・ハッサン',
    },
    { short_country_name: '韓', country_name: '韓国', name: '任勇洙' },
    { short_country_name: '丁', country_name: 'デンマーク', name: 'マー君' },
    { short_country_name: '諾', country_name: 'ノルウェー', name: 'ノル君' },
    { short_country_name: '氷', country_name: 'アイスランド', name: '17億' },
    { short_country_name: '蘭', country_name: 'オランダ', name: '蘭にいさん' },
    { short_country_name: '白', country_name: 'ベルギー', name: 'ベルベル' },
    {
      short_country_name: '葡',
      country_name: 'ポルトガル',
      name: 'ポルトさん',
    },
    {
      short_country_name: '盧',
      country_name: 'ルクセンブルク',
      name: 'ルクセン',
    },
    { short_country_name: '摩', country_name: 'モナコ', name: 'モナ子さん' },
    {
      short_country_name: '列',
      country_name: 'リヒテンシュタイン',
      name: 'リヒテン',
    },
    { short_country_name: '機', country_name: 'キプロス', name: 'キプくん' },
    { short_country_name: '', country_name: '北キプロス', name: '北キプ' },
    {
      short_country_name: '宇',
      country_name: 'ウクライナ',
      name: 'とばっちり子',
    },
    { short_country_name: '尼', country_name: 'ルーマニア', name: 'ルーさん' },
    { short_country_name: '勃', country_name: 'ブルガリア', name: '勃くん' },
    { short_country_name: '喪', country_name: 'モルドバ', name: 'モル君' },
    { short_country_name: '捷', country_name: 'チェコ', name: 'チェ子さん' },
    {
      short_country_name: '斯',
      country_name: 'スロバキア',
      name: 'バキアくん',
    },
    {
      short_country_name: '濠',
      country_name: 'オーストラリア',
      name: '濠くん',
    },
    {
      short_country_name: '新',
      country_name: 'ニュージーランド',
      name: '新さん',
    },
    { short_country_name: '玖', country_name: 'キューバ', name: '玖さん' },
    { short_country_name: '泰', country_name: 'タイ', name: '泰さん' },
    { short_country_name: '越', country_name: 'ベトナム', name: '越っちゃん' },
    { short_country_name: '印', country_name: 'インド', name: '印さん' },
    { short_country_name: '蒙', country_name: 'モンゴル', name: '蒙さん' },
    { short_country_name: '台', country_name: '台湾', name: '気苦労娘' },
    { short_country_name: '香', country_name: '香港', name: '大英帝国の呪い' },
    { short_country_name: '澳', country_name: 'マカオ', name: '澳門さん' },
    { short_country_name: '蔵', country_name: 'チベット', name: 'チベさん' },
    {
      short_country_name: '比',
      country_name: 'フィリピン',
      name: 'フィリーさん',
    },
    {
      short_country_name: '尼',
      country_name: 'インドネシア',
      name: 'ネシアさん',
    },
    { short_country_name: '星', country_name: 'シンガポール', name: '星さん' },
    {
      short_country_name: '馬',
      country_name: 'マレーシア',
      name: 'マレーさん',
    },
    {
      short_country_name: '塞',
      country_name: 'セーシェル',
      name: 'セーちゃん',
    },
    {
      short_country_name: '夏',
      country_name: 'カメルーン',
      name: 'カメちゃん',
    },
    { short_country_name: '', country_name: 'エクアドル', name: 'エクさん' },
    { short_country_name: '', country_name: 'セボルガ公国', name: 'セボくん' },
    { short_country_name: '', country_name: 'ワイ公国', name: 'ワイちゃん' },
    {
      short_country_name: '',
      country_name: 'クーゲルムーゲル',
      name: 'クーゲルちゃん',
    },
    { short_country_name: '', country_name: 'モロッシア', name: 'モロさん' },
    {
      short_country_name: '',
      country_name: 'ハット・リバー王国',
      name: 'トリバさん',
    },
    {
      short_country_name: '',
      country_name: 'ニコニコ共和国',
      name: 'ニコニコさん',
    },
    { short_country_name: '', country_name: 'ラドニア', name: 'ラド君' },
    {
      short_country_name: '',
      country_name: 'ピカルディ',
      name: 'ピカルディ君',
    },
    {
      short_country_name: '古埃',
      country_name: '古代エジプト',
      name: '埃ママ',
    },
    {
      short_country_name: '古希',
      country_name: '古代ギリシア',
      name: 'ヘラママ',
    },
    {
      short_country_name: '羅',
      country_name: 'ローマ帝国',
      name: 'ローマ爺ちゃん',
    },
    { short_country_name: '', country_name: 'ゲルマン', name: 'ゲルマンさん' },
    {
      short_country_name: '波',
      country_name: 'ペルシア',
      name: 'ペルシアさん',
    },
    {
      short_country_name: '神羅',
      country_name: '神聖ローマ帝国',
      name: '神聖ローマ',
    },
    {
      short_country_name: '',
      country_name: 'ジョチ・ウルス',
      name: 'ジョチさん',
    },
    { short_country_name: '', country_name: 'ヘッセン', name: 'ヘッシャン' },
    {
      short_country_name: '',
      country_name: 'テンプル騎士団',
      name: 'テンプルさん',
    },
    { short_country_name: '', country_name: 'ジェノバ', name: 'ジェノさん' },
    { short_country_name: '', country_name: '日本各地', name: '尾張さん' },
  ];

  const getDictTitleFromURL = (url) =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const getNextMatchElement = (start_element, selector_string) => {
    let current_element = start_element;
    do {
      current_element = current_element.nextSibling;
    } while (
      current_element !== null &&
      (!current_element.matches || !current_element.matches(selector_string))
    );

    return current_element;
  };

  // get target coupling from charactor's table like following format
  // <title tag(e.g. h3)><a>フェリシアーノ・ヴァルガス</a></title tag>
  // ...
  // |南伊|ロヴィフェリ|西|トニョフェリ|
  // ...
  const getCouplingFromCharactersTable = (title_tag) => {
    const current_character_name = getDictTitleFromURL(
      title_tag.querySelector('a').href
    );
    const current_character = characters.find(
      (x) => x.name === current_character_name
    );
    if (current_character === undefined) return [];

    const target_table = getNextMatchElement(title_tag, 'table');
    const couplings = Array.from(target_table.querySelectorAll('tr'))
      .map((x) => Array.from(x.querySelectorAll('th,td')))
      .map((x) => [x.slice(0, 2), x.slice(2, 4)])
      .reduce((s, x) => [...s, ...x])
      .filter((x) => x.length === 2)
      .map((x) => {
        const short_country_name = x[0].innerText;
        const character = characters.find(
          (x) => x.short_country_name === short_country_name
        );
        if (character === undefined) return undefined;

        const tag_name = getDictTitleFromURL(x[1].querySelector('a').href);

        const getShortName = (name) => name.split('・').shift();
        return {
          characters: [
            {
              name: `${current_character.country_name}（${getShortName(
                current_character.name
              )}）`,
              dict_entry: current_character.name,
            },
            {
              name: `${character.country_name}（${getShortName(
                character.name
              )}）`,
              dict_entry: character.name,
            },
          ],
          tags: [{ name: tag_name }],
        };
      })
      .filter((x) => x);

    return couplings;
  };

  const title_tags = [
    ...(location.href ===
    'https://dic.pixiv.net/a/%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%93%E3%82%BF%E3%82%B0%E4%B8%80%E8%A6%A7'
      ? Array.from(document.querySelectorAll('#article-body > h3'))
      : []),
    ...(location.href ===
    'https://dic.pixiv.net/a/%E8%85%90%E5%90%91%E3%81%91%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2'
      ? Array.from(document.querySelectorAll('#article-body > p')).filter((x) =>
          x.querySelector('b > a')
        )
      : []),
    ...(location.href ===
    'https://dic.pixiv.net/a/%E8%85%90%E5%90%91%E3%81%91%E3%83%98%E3%82%BF%E3%83%AA%E3%82%A2'
      ? Array.from(document.querySelectorAll('#article-body > b'))
      : []),
  ];
  const target_couplings = title_tags
    .map((x) => getCouplingFromCharactersTable(x))
    .reduce((s, x) => [...s, ...x]);

  console.log(JSON.stringify(target_couplings));
})();
