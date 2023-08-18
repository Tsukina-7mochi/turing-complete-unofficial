import { PageInfo, Menu, Link } from './pageInfo';
import SimpleHTMLElement from './simpleHTMLElement';

const createListItemElement = function(content: string | SimpleHTMLElement) {
  const elItem = new SimpleHTMLElement('li');
  elItem.appendChild(content);
  return elItem;
}

const createLinkElement = function(href: string, content: string | SimpleHTMLElement) {
  const elLink = new SimpleHTMLElement('a');
  elLink.setAttribute('href', href);
  elLink.appendChild(content);
  return elLink;
}

const renderMenuReclusive = function(
  pageInfo: PageInfo,
  menu: Menu,
  titleLevel: number
): SimpleHTMLElement[] {
  const elements: SimpleHTMLElement[] = [];
  const titleElementName = `h${Math.max(1, Math.min(titleLevel, 6))}`;

  //// if menu has title, render title element ////
  if(typeof menu.title === 'string') {
    const elTitle = new SimpleHTMLElement(titleElementName);
    elTitle.classList.add('menu-title');
    elTitle.appendChild(menu.title);

    if(menu.collapsible) {
      elTitle.classList.add('collapsible-controller');
      elTitle.children.push(`<span class="material-icons">&#xE5CF;</span>`);
    }

    elements.push(elTitle);
  }

  //// render menu content ////
  const elContentRoot = new SimpleHTMLElement('nav');
  if(menu.collapsible) {
    elContentRoot.classList.add('collapsible');
  }
  const groupedItems: SimpleHTMLElement[] = [];
  // make list of grouped items and append them to content root
  // then clear grouped item list
  const flushGroupedItems = function(elContentRoot, groupedItems) {
    const elList = new SimpleHTMLElement('ul');
    groupedItems.forEach((item) => elList.appendChild(item));
    elContentRoot.appendChild(elList);
    groupedItems.splice(0, groupedItems.length);
  }

  for(const content of menu.contents) {
    if(typeof content === 'string') {
      const page = pageInfo.pages[content];
      if(page === undefined) {
        // content is just a text
        groupedItems.push(createListItemElement(content));
      } else {
        // content is a link to page titled with its value
        const elLink = createLinkElement(`${content}.html`, page.title);
        elLink.classList.add('page-link');
        const elItem = createListItemElement(elLink);
        groupedItems.push(elItem);
      }
    } else if('href' in content && 'text' in content) {
      // content is a link
      const elLink = createLinkElement(content.href, content.text);
      const elItem = createListItemElement(elLink);
      groupedItems.push(elItem);
    } else if('contents' in content) {
      if(groupedItems.length > 0) {
        flushGroupedItems(elContentRoot, groupedItems);
      }
      const menuElements = renderMenuReclusive(
        pageInfo,
        content,
        titleLevel + 1
      );
      for(const element of menuElements) {
        elContentRoot.appendChild(element);
      }
    } else {
      throw Error(`Invalid menu item in menu definition: ${content}`);
    }
  }
  if(groupedItems.length > 0) {
    flushGroupedItems(elContentRoot, groupedItems);
  }

  return elements;
}

const renderMenu = function(pageInfo: PageInfo): string {
  const menu = renderMenuReclusive(pageInfo, pageInfo.menu, 1);
  return menu.map((element) => element.toString()).join('');
}

export default renderMenu;
