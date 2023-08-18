import { pageInfo, Menu, Link } from './pageInfo';
import SimpleHTMLElement from './simpleHTMLElement';

const createMenu = function (
  menu: Menu,
  titleLevel: number
): SimpleHTMLElement[] {
  const htmlElements: SimpleHTMLElement[] = [];

  if (menu.title) {
    const title = new SimpleHTMLElement(
      'h' + Math.max(1, Math.min(6, titleLevel))
    );
    title.classList.add('menu-title');
    title.appendChild(menu.title);

    if (menu.collapsible) {
      title.classList.add('collapsible-controller');
      title.children.push(`<span class="material-icons">&#xE5CF;</span>`);
    }

    htmlElements.push(title);
  }

  const contentRoot = new SimpleHTMLElement('nav');
  if (menu.collapsible) {
    contentRoot.classList.add('collapsible');
  }

  let contentList: SimpleHTMLElement | null = null;
  menu.contents.forEach((content) => {
    if (Object.prototype.hasOwnProperty.call(content, 'contents')) {
      // treat as menu

      if (contentList !== null) {
        contentRoot.appendChild(contentList);
        contentList = null;
      }

      createMenu(<Menu>content, titleLevel + 1).forEach((menu) => {
        contentRoot.appendChild(menu);
      });
    } else if (typeof content === 'string') {
      if (contentList === null) {
        contentList = new SimpleHTMLElement('ul');
      }

      const item = new SimpleHTMLElement('li');
      item.appendChild(
        `<a href="${content}.html" class="page-link">${pageInfo.pages[content].title}</a>`
      );

      contentList.appendChild(item);
    } else if (
      Object.prototype.hasOwnProperty.call(content, 'href') &&
      Object.prototype.hasOwnProperty.call(content, 'text')
    ) {
      if (contentList === null) {
        contentList = new SimpleHTMLElement('ul');
      }

      const item = new SimpleHTMLElement('li');
      item.appendChild(
        `<a href="${(<Link>content).href}" class="page-link">${
          (<Link>content).text
        }</a>`
      );

      contentList.appendChild(item);
    }
  });

  if (contentList !== null) {
    contentRoot.appendChild(contentList);
  }
  htmlElements.push(contentRoot);

  return htmlElements;
};

const generateMenuHTML = function (): string {
  return createMenu(pageInfo.menu, 1)
    .map((el) => el.toString())
    .join(' ');
};

export default generateMenuHTML;
