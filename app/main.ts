import requestPage from './requestPage';
import './style/main.scss';
import transitPage from './transitPage';

const loadMenu = async function(): Promise<void> {
  const elMenu = document.querySelector('div.menu');
  if(elMenu === null) {
    console.error('menu element (div.menu) is not exist');
    return;
  }

  const menu = await requestPage('menu');
  if(menu === null) {
    console.error('Failed to load menu');
  }

  elMenu.innerHTML = menu ?? 'メニューの読み込みに失敗';
}

window.addEventListener('load', () => {
  // load menu
  loadMenu();

  // main element
  const elMain = document.querySelector('main');
  if(elMain === null) {
    document.body.textContent = '読み込みに失敗したようです...';

    throw Error('Main element is not found!');
  }

  const transit = function(fallbackPageName?: string) {
    const pageToTransit = (location.hash !== '' ? location.hash.slice(1) : 'index');
    transitPage(pageToTransit, elMain, fallbackPageName);
  }

  // transit to index page
  transit('index');

  // history移動の検知
  window.addEventListener('popstate', () => {
    transit();
  });
});