import { pageInfo, Menu, Link } from './pageInfo';

const createMenuDOM = function(menu: Menu, titleLevel: number): DocumentFragment {
  const fragment = document.createDocumentFragment();

  if(menu.title) {
    const title = document.createElement(`h${Math.max(1, Math.min(6, titleLevel))}`);

    if(menu.collapsible) {
      title.classList.add('collapsible-controller');

      const icon = document.createElement('span');
      icon.innerHTML = `&#xE5CF;`;
      icon.classList.add('material-icons');

      title.appendChild(icon);

      title.addEventListener('click', () => {
        title.classList.toggle('expanded');
        icon.innerHTML = title.classList.contains('expanded') ? '&#xE5CE;' : '&#xE5CF;';
      });
    }

    title.appendChild(document.createTextNode(menu.title));

    fragment.appendChild(title);
  }

  const contentRoot = document.createElement('nav');
  if(menu.collapsible) {
    contentRoot.classList.add('collapsible');
  }

  let contentList: (HTMLUListElement | null) = null;
  menu.contents.forEach(content => {
    if(Object.prototype.hasOwnProperty.call(content, 'contents')) {
      // treat as menu

      if(contentList !== null) {
        contentRoot.appendChild(contentList);
        contentList = null;
      }

      contentRoot.appendChild(createMenuDOM(<Menu>content, titleLevel + 1));
    } else if(typeof content === 'string') {
      if(contentList === null) {
        contentList = document.createElement('ul');
      }

      const item = document.createElement('li');
      item.innerHTML = `<a href="#${content}" class="page-link">${pageInfo.data?.pages[content].title}</a>`

      contentList.appendChild(item);
    } else if(Object.prototype.hasOwnProperty.call(content, 'href')
           && Object.prototype.hasOwnProperty.call(content, 'text')) {
      if(contentList === null) {
        contentList = document.createElement('ul');
      }

      const item = document.createElement('li');
      item.innerHTML = `<a href="${(<Link>content).href}" class="page-link">${(<Link>content).text}</a>`

      contentList.appendChild(item);
    }
  });

  if(contentList !== null) {
    contentRoot.appendChild(contentList);
  }
  fragment.appendChild(contentRoot);

  return fragment;
}

const loadMenu = async function(): Promise<void> {
  if(pageInfo.data === null) {
    await pageInfo.ready;
  }

  if(pageInfo.data === null) {
    throw Error('pageInfo is null!');
  } else {
    const elMenu = document.querySelector<HTMLDivElement>('div.menu');
    if(elMenu === null) {
      console.error('menu element (div.menu) is not exist');
      return;
    }

    elMenu.append(createMenuDOM(pageInfo.data.menu, 1));
  }
}

export default loadMenu;