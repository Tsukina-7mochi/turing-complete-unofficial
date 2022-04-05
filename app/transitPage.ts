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
      controller.addEventListener('click', () => {
        controller.classList.toggle('expanded');

        if(controller.classList.contains('expanded')) {
          controller.innerHTML = '&#xE5CE;隠す';
        } else {
          controller.innerHTML = '&#xE5CF;開く';
        }
      });
    });

    // 数式の変換
    if(window.Worker) {
      document.querySelectorAll('.math-inline').forEach((el) => {
        const worker = new Worker(`${window.location.origin + window.location.pathname}/app/mathWorker.bundle.js`);

        worker.onmessage = (message): void => {
          el.innerHTML = <string> message.data;
        };

        worker.postMessage({
          code: el.textContent,
          options: {}
        });
      });

      document.querySelectorAll('.math-block').forEach((el) => {
        const worker = new Worker(`${window.location.origin + window.location.pathname}/app/mathWorker.bundle.js`);

        worker.onmessage = (message): void => {
          el.innerHTML = <string> message.data;
        };

        worker.postMessage({
          code: el.textContent,
          options: {
            displayMode: true
          }
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