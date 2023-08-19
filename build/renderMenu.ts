import { PageInfo, Menu, Link } from './pageInfo';
import SimpleHTMLElement from './simpleHTMLElement';
import { createElement, createList } from './simpleHTMLElementUtil';

const createLinkElement = function (
  href: string,
  content: string | SimpleHTMLElement,
  isPageLink = false
) {
  const className = isPageLink ? 'page-link' : '';
  return createElement('a', content, className, { href });
};

const renderMenuReclusive = function (
  pageInfo: PageInfo,
  menu: Menu,
  titleLevel: number
): SimpleHTMLElement[] {
  const elements: SimpleHTMLElement[] = [];
  const titleTag = `h${Math.max(1, Math.min(titleLevel, 6))}`;

  //// if menu has title, render title element ////
  if (typeof menu.title === 'string') {
    const elTitle = createElement(titleTag, menu.title, 'menu-title');
    if (menu.collapsible) {
      elTitle.classList.add('collapsible-controller');
      elTitle.children.push(`<span class="material-icons">&#xE5CF;</span>`);
    }

    elements.push(elTitle);
  }

  //// render menu content ////
  const elContentRoot = new SimpleHTMLElement('nav');
  if (menu.collapsible) {
    elContentRoot.classList.add('collapsible');
  }
  const groupedItems: (SimpleHTMLElement | string)[] = [];
  // make list of grouped items and append them to content root
  // then clear grouped item list
  const flushGroupedItems = function () {
    elContentRoot.appendChild(createList(groupedItems));
    groupedItems.splice(0, groupedItems.length);
  };

  for (const content of menu.contents) {
    if (typeof content === 'string') {
      const page = pageInfo.pages[content];
      if (page === undefined) {
        // content is just a text
        groupedItems.push(content);
      } else {
        // content is a link to page titled with its value
        const elLink = createLinkElement(`${content}.html`, page.title, true);
        groupedItems.push(elLink);
      }
    } else if ('href' in content && 'text' in content) {
      // content is a link
      const elLink = createLinkElement(content.href, content.text);
      groupedItems.push(elLink);
    } else if ('contents' in content) {
      if (groupedItems.length > 0) {
        flushGroupedItems();
      }
      const menuElements = renderMenuReclusive(
        pageInfo,
        content,
        titleLevel + 1
      );
      for (const element of menuElements) {
        elContentRoot.appendChild(element);
      }
    } else {
      throw Error(`Invalid menu item in menu definition: ${content}`);
    }
  }
  if (groupedItems.length > 0) {
    flushGroupedItems();
  }

  elements.push(elContentRoot);

  return elements;
};

const renderMenu = function (pageInfo: PageInfo): string {
  const menu = renderMenuReclusive(pageInfo, pageInfo.menu, 1);
  return menu.map((element) => element.toString()).join('');
};

export default renderMenu;
