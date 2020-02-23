// https://dic.pixiv.net/a/%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%E3%81%AE%E3%82%AB%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0%E4%B8%80%E8%A6%A7
// usage: paste this script to javascript console

(() => {
  const getDictTitleFromURL = url =>
    decodeURI(url).replace(/https?:\/\/dic\.pixiv\.net\/a\//, '');

  const getNextMatchElement = (start_element, selector_string) => {
    let current_element = start_element;
    do {
      current_element = current_element.nextSibling;
    } while (
      current_element !== null &&
      !current_element.matches(selector_string)
    );

    return current_element;
  };

  // get target coupling from charactor's table like following format
  // <title tag(e.g. h4)><a>春香</a></title tag>
  // ...
  //<table>
  //  <tbody>
  //    <tr>
  //      <th>本人</th>
  //      <td>
  //        <a href="http://dic.pixiv.net/a/%E3%81%AF%E3%82%8B%E3%81%AF%E3%82%8B">
  //          はるはる
  //        </a>
  //      </td>
  //      <th>
  //        <a href="http://dic.pixiv.net/a/%E5%A6%82%E6%9C%88%E5%8D%83%E6%97%A9">
  //          千早
  //        </a>
  //      </th>
  //      <td>
  //        <b>
  //          <a href="http://dic.pixiv.net/a/%E3%81%AF%E3%82%8B%E3%81%A1%E3%81%AF">
  //            はるちは
  //          </a>
  //        </b>
  //      </td>
  //    </tr>
  //    ...
  const getCouplingFromCharactorsTable = title_tag => {
    const current_charactor = getDictTitleFromURL(
      title_tag.querySelector('a').href
    );

    const target_table = getNextMatchElement(title_tag, 'table');
    const couplings = Array.from(target_table.querySelectorAll('tr'))
      .map(x => Array.from(x.querySelectorAll('th,td')))
      .map(x => [x.slice(0, 2), x.slice(2, 4)])
      .reduce((s, x) => [...s, ...x])
      .filter(x => x.length === 2)
      .map(x => ({
        friend_link: x[0].querySelector('a'),
        tags_link: Array.from(x[1].querySelectorAll('a')),
      }))
      .filter(x => x.friend_link !== null && x.tags_link.length !== 0)
      .map(x => ({
        characters: [
          current_charactor,
          getDictTitleFromURL(x.friend_link.href),
        ],
        tags: x.tags_link.map(x => ({ name: getDictTitleFromURL(x) })),
      }));

    return couplings;
  };

  const target_couplings = Array.from(document.querySelectorAll('h4'))
    .map(x => getCouplingFromCharactorsTable(x))
    .reduce((s, x) => [...s, ...x]);

  console.log(JSON.stringify(target_couplings));
})();
