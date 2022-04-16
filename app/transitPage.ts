import requestPage from "./requestPage";
import katex from 'katex';

const transitPage = async function(pageName: string, targetElement: HTMLElement, fallback?: string): Promise<void> {
  // console.log(`transit to ${pageName}`);

  // TODO: アニメーション
  targetElement.innerHTML = "読込中...";
  const content = await requestPage(pageName);

  if(content === null) {
    if(typeof fallback === 'string') {
      console.log('showing fallback page');

      transitPage(fallback, targetElement);
      return;
    }

    targetElement.innerHTML = `<h1>ページの読み込みに失敗しました</h1><p>🚧ページが見つからないか、準備中です🙇‍♂️</p>`;
  } else {
    targetElement.innerHTML = content;

    // スポイラーのロジックを追加
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
        icon.innerHTML = controller.classList.contains('expanded') ? '&#xE5CE;' : '&#xE5CF;';
        textNode.textContent = controller.classList.contains('expanded') ? '隠す' : '開く';
      });
    });

    // 数式の変換
    if(window.Worker) {
      document.querySelectorAll<HTMLElement>('x-equation').forEach((el) => {
        const worker = new Worker(`${window.location.origin + window.location.pathname}/app/mathWorker.bundle.js`);
        // md4cはLaTeX数式を<x-equation>で囲って出力する
        // ディスプレイモードの数式 ($$...$$) の場合type属性にdisplayが設定される
        const displayMode = el.getAttribute('type') === 'display';

        worker.onmessage = (message): void => {
          el.innerHTML = <string> message.data;
        };

        worker.postMessage({
          code: el.textContent,
          options: { displayMode }
        });
      });
    } else {
      document.querySelectorAll<HTMLElement>('.math-inline').forEach((el) => {
        katex.render(el.textContent ?? '', el, {
          throwOnError: false
        })
      });

      document.querySelectorAll<HTMLElement>('.math-block').forEach((el) => {
        katex.render(el.textContent ?? '', el, {
          throwOnError: false,
          displayMode: true
        })
      });
    }
  }

  if(pageName === 'index') {
    document.title = document.querySelector('h1')?.textContent ?? 'Turing Complete Unofficial';
  } else {
    document.title = 'Turing Complete Unofficial | ' + document.querySelector('h1')?.textContent ?? pageName;
  }
}

export default transitPage;