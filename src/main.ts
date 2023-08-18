import './style/main.scss';
import initMenu from './menu';
import katex from 'katex';

const initSpoiler = function (): void {
  // スポイラーのロジックを有効化
  document.querySelectorAll('.spoiler-controller').forEach((controller) => {
    controller.classList.remove('material-icons');

    const icon = document.createElement('span');
    icon.innerHTML = '&#xE5CF;';
    icon.classList.add('material-icons');

    const textNode = document.createTextNode('開く');

    controller.innerHTML = '';
    controller.appendChild(icon);
    controller.appendChild(textNode);

    controller.addEventListener('click', () => {
      controller.classList.toggle('expanded');
      icon.innerHTML = controller.classList.contains('expanded')
        ? '&#xE5CE;'
        : '&#xE5CF;';
      textNode.textContent = controller.classList.contains('expanded')
        ? '隠す'
        : '開く';
    });
  });
};

const convertMath = function (): void {
  // 数式の変換
  try {
    document.querySelectorAll<HTMLElement>('x-equation').forEach((el) => {
      const worker = new Worker(`./mathWorker.bundle.js`);
      // md4cはLaTeX数式を<x-equation>で囲って出力する
      // ディスプレイモードの数式 ($$...$$) の場合type属性にdisplayが設定される
      const displayMode = el.getAttribute('type') === 'display';

      worker.onmessage = (message): void => {
        el.innerHTML = <string>message.data;
      };

      worker.postMessage({
        code: el.textContent,
        options: { displayMode },
      });
    });
  } catch {
    // 埋め込んだkatexで変換
    document.querySelectorAll<HTMLElement>('.math-inline').forEach((el) => {
      katex.render(el.textContent ?? '', el, {
        throwOnError: false,
      });
    });

    document.querySelectorAll<HTMLElement>('.math-block').forEach((el) => {
      katex.render(el.textContent ?? '', el, {
        throwOnError: false,
        displayMode: true,
      });
    });
  }
};

window.addEventListener('load', () => {
  initMenu();

  initSpoiler();

  // 検索ロジック
  const elSearchForm = document.querySelector<HTMLFormElement>(
    'body > header > .search form'
  );
  const elSearchInput = elSearchForm?.querySelector<HTMLInputElement>('input');
  if (!elSearchForm) {
    console.error('search form is not found');
  } else if (!elSearchInput) {
    console.error('search input is not found');
  } else {
    elSearchForm.addEventListener('submit', () => {
      // 検索
    });
  }

  convertMath();
});
