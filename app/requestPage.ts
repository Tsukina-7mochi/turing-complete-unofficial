import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const linkNameReplacer = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9_ -]/g, '').replace(/[ -]/g, '_');

const processMarkdown = function(content_: string): string {
  let content = content_;

  // ターゲットなしリンクの書き換え
  content = content.replace(/\[[^[]+\](?![(])/g, (str: string) => {
    const name = str.slice(1, -1);
    const linkName = linkNameReplacer(name);

    // return `${str}(${linkName})`;
    return `<a href="#${linkName}" class="page-link" data-target=${linkName}>${name}</a>`;
  });


  return content;
}

const processHTML = function(content: string): string {
  const doc = new DOMParser().parseFromString(content, 'text/html');

  // code:truth_tableの書き換え
  doc.querySelectorAll('pre > code.language-truth_table').forEach((elCode) => {
    const lines = (elCode.textContent ?? '').trim().split('\n').map((line) => line.trim());
    const cells = lines.map((line) => line.split(',').map((cell) => cell.trim()));
    const tableHeight = cells.map((line) => line.length).reduce((prev, cur) => (prev < cur ? cur : prev), 0);

    const table = document.createElement('table');
    table.className = 'truth';
    const tbody = document.createElement('tbody');
    const trs = new Array(tableHeight).fill(0).map(() => document.createElement('tr'));
    cells.forEach((line) => {
      for(let i = 0; i < tableHeight; i++) {
        const td = document.createElement('td');
        td.textContent = line[i];
        if(line[i] === 'T' || line[i] === '1') {
          td.classList.add('T');
        }
        if(line[i] === 'F' || line[i] === '0') {
          td.classList.add('F');
        }

        trs[i].appendChild(td);
      }
    });

    trs.forEach((tr) => {
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    // pre > code の直前に挿入
    elCode.parentNode?.parentNode?.insertBefore(table, elCode.parentNode);
    elCode.parentNode?.parentNode?.removeChild(elCode.parentNode);
  });

  // スポイラー
  doc.querySelectorAll('.spoiler').forEach((spoiler) => {
    const controller = document.createElement('div');
    controller.className = 'spoiler-controller material-icons';
    controller.innerHTML = '&#xE5CF;開く';

    spoiler.parentNode?.insertBefore(controller, spoiler);
  });

  return doc.body.innerHTML;
}

const requestPage = async function(pageName: string): Promise<string | null> {
  try {
    const response = await axios.get(`pages/${pageName}.md`, {
      baseURL: window.location.origin + window.location.pathname
    });
    // console.log(response);

    const rawContent = <string> response.data;
    // console.log(rawContent);

    const content = processMarkdown(rawContent);
    // console.log(content);

    const HTMLContent = await <Promise<string>> new Promise((resolve, reject) => {
      marked.parse(content, (error, result) => {
        if(error) {
          console.error('Failed to parse Markdown');
          reject(error);
        }

        resolve(result);
      });
    });
    // console.log(HTMLContent);

    const pureHTMLContent = DOMPurify.sanitize(HTMLContent);
    // console.log(pureHTMLContent);

    return processHTML(pureHTMLContent);
  } catch(err) {
    console.error(`Failed to load page "${pageName}".`, err);

    return null;
  }

  // not reached but for completeness
  return null;
}

export default requestPage;

export {
  linkNameReplacer
}