import requestPage from './requestPage';

const registerExpansion = function(rootElement: HTMLElement): void {
  for(let i = 0; i < rootElement.children.length - 1; i++) {
    const tagName1 = rootElement.children[i].tagName;
    const tagName2 = rootElement.children[i + 1].tagName;

    if(tagName1 === 'H1' || tagName1 === 'H2' || tagName1 === 'H3'
    || tagName1 === 'H4' || tagName1 === 'H5' || tagName1 === 'H6') {
      if(tagName2 === 'UL' || tagName2 === 'OL') {
        const controller = rootElement.children[i];
        const list = rootElement.children[i + 1];

        list.classList.add('collapsible');
        controller.classList.add('collapsible-controller');
        controller.classList.add('collapsed');

        const expandButton = document.createElement('span');
        expandButton.className = 'material-icons expand';
        expandButton.innerHTML = '&#xE5CF;';
        const collapseButton = document.createElement('span');
        collapseButton.className = 'material-icons collapse';
        collapseButton.innerHTML = '&#xE5CE;';

        controller.insertBefore(expandButton, controller.childNodes[0]);
        controller.insertBefore(collapseButton, controller.childNodes[0]);

        controller.addEventListener('click', () => {
          controller.classList.toggle('collapsed');
          controller.classList.toggle('expanded');
        });
      }
    }
  }
}

const loadMenu = async function(): Promise<void> {
  const elMenu = document.querySelector<HTMLDivElement>('div.menu');
  if(elMenu === null) {
    console.error('menu element (div.menu) is not exist');
    return;
  }

  const menu = await requestPage('menu');
  if(menu === null) {
    console.error('Failed to load menu');
    elMenu.innerHTML = 'メニューの読み込みに失敗';
  } else {
    elMenu.innerHTML = menu;

    registerExpansion(elMenu);
  }
}

export default loadMenu;