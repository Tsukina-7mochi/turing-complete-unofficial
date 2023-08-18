const initMenu = function (): void {
  // メニューの折り畳みのリスナーを追加
  document.querySelectorAll('.collapsible-controller').forEach((title) => {
    title.addEventListener('click', () => {
      title.classList.toggle('expanded');

      // 左辺値だと title.querySelector('span')?.innerHTML = ...
      // とするとエラーが出てしまう
      //
      const iconSpan = title.querySelector('span');
      if (iconSpan) {
        iconSpan.innerHTML = title.classList.contains('expanded')
          ? '&#xE5CE;'
          : '&#xE5CF;';
      }
    });
  });

  // 1カラムの場合にメニューを表示/非表示するボタンの
  // イベントリスナを登録
  const elMenu = document.querySelector<HTMLDivElement>('div.menu');
  if (elMenu === null) {
    console.error('menu element (div.menu) is not exist');
    return;
  }
  const menuToggleButton = document.querySelector('header > div.menu-button');
  if (menuToggleButton === null) {
    throw Error('menuToggleButton is null!');
  } else {
    menuToggleButton.addEventListener('click', () => {
      elMenu.classList.toggle('shown');
    });
  }
};

export default initMenu;
