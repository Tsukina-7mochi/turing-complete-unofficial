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

        const icon = document.createElement('span');
        icon.className = 'material-icons expand';
        icon.innerHTML = '&#xE5CF;';

        controller.insertBefore(icon, controller.childNodes[0]);

        controller.addEventListener('click', () => {
          controller.classList.toggle('expanded');
          if(controller.classList.contains('expanded')) {
            icon.innerHTML = '&#xE5CE;';
          } else {
            icon.innerHTML = '&#xE5CF;';
          }
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

    // 折りたたみの登録
    registerExpansion(elMenu);

    // メニュー表示ボタン
    document.querySelector('body > header > div.menu-button')?.addEventListener('click', () => {
      elMenu.classList.toggle('shown');
    });
  }
}

export default loadMenu;