// usage: paste this script on js console of yurigraph

(() => {
  const log = Array.from(
    document.querySelectorAll('#カップリングランキング ~ ol > li')
  )
    .map((li) => {
      const tag_name = li.querySelector('a').innerText;
      const num = parseInt(
        li
          .querySelector('span:nth-of-type(2)')
          .innerText.replace(/[\(\)作品]/, '')
      );
      return { tag_name, num };
    })
    .reduce((s, x) => [...s, x], []);

  console.log(JSON.stringify(log));
})();
