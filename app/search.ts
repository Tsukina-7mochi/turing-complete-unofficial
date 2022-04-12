import axios from 'axios';
import { toLinkName } from './pageInfo';
import Fuse from 'fuse.js'

const getMenu = async function(): Promise<string> {
  const response = await axios.get('pages/menu.md', {
    baseURL: window.location.origin + window.location.pathname
  });
  return response.data;
}

const renderSearchResult = function(searchText: string, targetElement: HTMLElement, titleMatched_: Promise<Fuse.FuseResult<string>[]>): void {
  const h1 = document.createElement('h1');
  h1.textContent = `「${window.decodeURIComponent(searchText)}」の検索結果`;
  targetElement.appendChild(h1);

  // title matched
  const titleMatchedH2 = document.createElement('h2');
  titleMatchedH2.textContent = 'タイトルが一致';
  targetElement.appendChild(titleMatchedH2);

  const titleMatchedSection = document.createElement('section');
  titleMatchedSection.textContent = '検索中...';
  targetElement.appendChild(titleMatchedSection);

  titleMatched_.then((titleMatched) => {
    titleMatchedSection.textContent = '';

    if(titleMatched.length === 0) {
      titleMatchedSection.textContent = '一致するものはありませんでした。🐬';
    } else {
      titleMatched.forEach((result) => {
        const article = document.createElement('article');
        const link = document.createElement('a');

        link.href = `#${toLinkName(result.item)}`;
        link.textContent = `${result.item}`;

        article.appendChild(link);
        titleMatchedSection.appendChild(article);
      });
    }
  });

  // content matched
  const contentMatchedH2 = document.createElement('h2');
  contentMatchedH2.textContent = '内容が一致';
  targetElement.appendChild(contentMatchedH2);

  const contentMatchedSection = document.createElement('h3');
  contentMatchedSection.textContent = '実装中です🚧';
  targetElement.appendChild(contentMatchedSection);

  // contentMatched_.then((contentMatched) => {
  //   // ...
  // });
}

const search = async function(searchText: string, targetElement: HTMLElement): Promise<void> {
  try {
    // TODO: アニメーション
    targetElement.innerHTML = '<h1>検索中...</h1>';

    const menuLinksLoaded = getMenu().then((menu) => Array.from(menu.matchAll(/\[.+\]/g)).map(result => result[0].slice(1, -1)));

    const titleMatchResult = menuLinksLoaded.then((links) => {
      const fuse = new Fuse(links, {
        findAllMatches: true,
        includeScore: true
      });
      return fuse.search(searchText);
    });

//     const contentMatchResult = menuLinksLoaded.then((links) => new Promise((resolve) => {
//       const contents: string[] = [];
//       const responses = links.map((link) => axios.get(`pages/${link}.md`, {
//         baseURL: window.location.origin + window.location.pathname
//       }).then((response) => {
//         contents.push(response.data);
//       }));
//
//       Promise.allSettled(responses).then(() => {
//         console.log(contents);
//
//         const fuse = new Fuse(contents, {
//           findAllMatches: true,
//           includeScore: true
//         });
//         resolve(fuse.search(searchText));
//       });
//     }));

    targetElement.innerHTML = '';
    renderSearchResult(searchText, targetElement, titleMatchResult);
  } catch(err) {
    console.error(err);
    targetElement.innerHTML = '<h1>検索できませんでした...🙇‍♂️</h1>';
  }
}

export default search;