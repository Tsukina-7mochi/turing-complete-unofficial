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

    document.querySelector('body > div.menu')?.classList?.remove('shown');
  }

  // transit to index page

  transit('index');

  // history移動の検知
  window.addEventListener('popstate', () => {
    transit();
  });

  // 検索
  const elSearchForm = document.querySelector<HTMLFormElement>('body > header > .search form');
  const elSearchInput = elSearchForm?.querySelector<HTMLInputElement>('input');
  if(!elSearchForm) {
    console.error('search form is not found');
  } else if(!elSearchInput){
    console.error('search input is not found');
  } else {
    elSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      window.history.pushState({}, '', `${window.location.origin + window.location.pathname}?${window.encodeURI(elSearchInput.value)}`);
      transit();
    });
  }
});