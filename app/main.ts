import './style/main.scss';
import transitPage from './transitPage';
import loadMenu from './menu';
import search from './search';

window.addEventListener('load', () => {
  // load menu
  loadMenu();

  // main element
  const elMain = document.querySelector('main');
  if(elMain === null) {
    document.body.textContent = '読み込みに失敗したようです...';

    throw Error('Main element is not found!');
  }

  const transit = function(fallbackPageName?: string): void {
    if(window.location.search !== '' && window.location.hash !== '') {
      // console.log(window.location.origin + window.location.pathname + window.location.hash);
      window.history.replaceState({}, '', window.location.origin + window.location.pathname + window.location.hash);
    }

    if(window.location.search !== '') {
      search(window.location.search.slice(1), elMain);
    } else {
      const pageToTransit = (location.hash !== '' ? location.hash.slice(1) : 'index');
      transitPage(pageToTransit, elMain, fallbackPageName);
    }
  }

  // transit to index page

  transit('index');

  // history移動の検知
  window.addEventListener('popstate', () => {
    transit();
  });

  // 検索
  const elSearchInput = document.querySelector<HTMLInputElement>('body > header > .search input');
  const elSearchButton = document.querySelector<HTMLButtonElement>('body > header > .search button');
  if(!elSearchInput) {
    console.error('search input is not found');
  } else if(!elSearchButton) {
    console.error('search button is not found');
  } else {
    elSearchButton.addEventListener('click', () => {
      window.history.pushState({}, '', `${window.location.origin + window.location.pathname}?${window.encodeURI(elSearchInput.value)}`);
      transit();
    });
    elSearchInput.addEventListener('keydown', (e) => {
      if(e.code === 'Enter') {
        window.history.pushState({}, '', `${window.location.origin + window.location.pathname}?${window.encodeURI(elSearchInput.value)}`);
        elSearchInput.blur();
        transit();
      }
    });
  }
});