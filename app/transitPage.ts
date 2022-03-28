import requestPage from "./requestPage";

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

    targetElement.innerHTML = `<h1>ページの読み込みに失敗しました</h1>`;
  } else {
    targetElement.innerHTML = content;
  }

  if(pageName === 'index') {
    document.title = document.querySelector('h1')?.textContent ?? 'Turing Complete Unofficial';
  } else {
    document.title = 'Turing Complete Unofficial | ' + document.querySelector('h1')?.textContent ?? pageName;
  }
}

export default transitPage;