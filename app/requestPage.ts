import axios from 'axios';
import * as markdown from 'markdown-wasm';
import DOMPurify from 'dompurify';
import { pageInfo, toLinkName } from './pageInfo';
import highlighter from './syntaxHighlight';

const processMarkdown = function(content_: string, pageName: string): string {
  let content = content_;

  // レベルページの場合、依存関係の情報を追加
  if(pageInfo.data !== null) {
    const page = pageInfo.data.pages[pageName];

    // console.log('data: ', pageInfo.data);


    if(page.category === 'level' && page.dependencies) {
      const dependents: string[] = [];

      for(const pageName_ in pageInfo.data.pages) {
        const page_ = pageInfo.data.pages[pageName_];

        if(page_.category === 'level' && page_.dependencies) {
          if(page_.dependencies.includes(pageName)) {
            dependents.push(pageName_);
          }
        }
      }

      const stringToInsert = [
        '<h2>前提レベル</h2><ul>',
        page.dependencies.map(levelName => `<li><a href="#${levelName}" class="page-link">${pageInfo.data?.pages[levelName].title}</a></li>`).join(''),
        '</ul><h2>このレベルを前提とするレベル</h2><ul>',
        dependents.map(levelName => `<li><a href="#${levelName}" class="page-link">${pageInfo.data?.pages[levelName].title}</a></li>`).join(''),
        '</ul>\n\n',
      ].join('');

      // 最初のh2の前に挿入
      const insertPos = content.match(/^##/m)?.index;
      if(insertPos) {
        content = content.slice(0, insertPos) + stringToInsert + content.slice(insertPos);
      } else {
        console.error('No place to insert dependency information');
      }
    }
  }

  // ターゲットなしリンクの書き換え
  content = content.replace(/\[[^[]+\](?![(])/g, (str: string) => {
    const name = str.slice(1, -1);
    const linkName = toLinkName(name);

    return `<a href="#${linkName}" class="page-link">${name}</a>`;
  });

  return content;
}

const buildTruthTable = function(content: string): string {
  const cells = content.trim().split('\n')
    .map(line => {
      return line.trim().split(',');
    });

  const tableHeight = ((): number => {
    let height = 0;
    for(const row of cells) {
      if(height < row.length) {
        height = row.length;
      }
    }

    return height;
  })();

  // transpose cells
  const transposedCells: string[][] = [];
  for(let i = 0; i < tableHeight; i++) {
    const arr = [];
    for(let j = 0; j < cells.length; j++) {
      arr.push(cells[j][i]);
    }
    transposedCells.push(arr);
  }

  return '<table class="truth"><tbody>' + transposedCells.map((row) => {
    return '<tr>' + row.map((cell_) => {
      const cell = cell_.trim();

      if(cell === 'T' || cell === '1') {
        return `<td class="T">${cell}</td>`;
      } else if(cell === 'F' || cell === '0') {
        return `<td class="F">${cell}</td>`;
      }

      return `<td>${cell}</td>`;
    }).join('') + '</tr>';
  }).join('') + '</tbody></table>';
}

const requestPage = async function(pageName: string): Promise<string | null> {
  try {
    if(pageInfo.data === null) {
      await pageInfo.ready;
    }

    const response = await axios.get(`pages/${pageName}.md`, {
      baseURL: window.location.origin + window.location.pathname
    });
    // console.log(response);

    let content = <string> response.data;
    // console.log(content);

    content = processMarkdown(content, pageName);
    // console.log(content);

    content = markdown.parse(content, {
      parseFlags:
        markdown.ParseFlags.COLLAPSE_WHITESPACE |
        markdown.ParseFlags.TABLES |
        markdown.ParseFlags.STRIKETHROUGH |
        markdown.ParseFlags.LATEX_MATH_SPANS |
        markdown.ParseFlags.UNDERLINE,
      allowJSURIs: false,
      onCodeBlock: (lang: string, body: markdown.UTF8Bytes): string | markdown.UTF8Bytes => {
        if(lang === 'truth_table') {
          return buildTruthTable(body.toString());
        } else if(lang === 'latex') {
          return Uint8Array.from([
            ...[...'<x-equation type="display">'].map((ch) => ch.charCodeAt(0)),
            ...body,
            ...[...'</x-equation>'].map((ch) => ch.charCodeAt(0))
          ]);
        } else if(lang.startsWith('assembly')) {
          return highlighter.assembly(body.toString());
        }

        return body;
      }
    });
    // console.log(content);

    content = DOMPurify.sanitize(content, {
      ADD_TAGS: ['x-equation']
    });
    // console.log(pureHTMLContent);

    return content;
  } catch(err) {
    console.error(`Failed to load page "${pageName}".`, err);

    return null;
  }

  // not reached but for completeness
  return null;
}

export default requestPage;
