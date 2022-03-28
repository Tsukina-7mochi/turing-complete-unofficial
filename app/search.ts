import axios from 'axios';
import { linkNameReplacer } from './requestPage';
import Fuse from 'fuse.js'

const getMenu = async function(): Promise<string> {
  const response = await axios.get(`/pages/menu.md`);
  return response.data;
}

const renderSearchResult = function(searchText: string, targetElement: HTMLElement, titleMatched: Fuse.FuseResult<string>[]): void {
  const h1 = document.createElement('h1');
  h1.textContent = `${searchText} の検索結果`;
  targetElement.appendChild(h1);

  // title matched
  const titleMatchedH2 = document.createElement('h2');
  titleMatchedH2.textContent = 'タイトルが一致';
  targetElement.appendChild(titleMatchedH2);

  if(titleMatched.length === 0) {
    const article = document.createElement('article');
    article.textContent = '一致するものはありませんでした。🐬';

    targetElement.appendChild(article);
  } else {
    titleMatched.forEach((result) => {
      const article = document.createElement('article');
      const link = document.createElement('a');

      link.href = `#${linkNameReplacer(result.item)}`;
      link.textContent = `${result.item}`;

      article.appendChild(link);
      targetElement.appendChild(article);
    });
  }

  // content matched
  const contentMatchedH2 = document.createElement('h2');
  contentMatchedH2.textContent = '内容が一致';
  targetElement.appendChild(contentMatchedH2);

  const article = document.createElement('article');
  article.textContent = '実装中です🚧';
  targetElement.appendChild(article);
}

const search = async function(searchText: string, targetElement: HTMLElement): Promise<void> {
  try {
    // TODO: アニメーション
    targetElement.innerHTML = '<h1>検索中...</h1>';

    const menu = await getMenu();
    const links = Array.from(menu.matchAll(/\[.+\]/g)).map(result => result[0].slice(1, -1));
    const titleMatchResult = new Fuse(links, {
      findAllMatches: true,
      includeScore: true
    }).search(searchText);

    targetElement.innerHTML = '';
    renderSearchResult(searchText, targetElement, titleMatchResult);
  } catch(err) {
    console.error(err);
    targetElement.innerHTML = '<h1>検索できませんでした...🙇‍♂️</h1>';
  }
}

export default search;