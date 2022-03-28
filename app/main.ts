import './style/main.scss';
import transitPage from './transitPage';
import loadMenu from './menu';

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