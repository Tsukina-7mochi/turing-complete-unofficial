import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import path from 'path';

const linkNameReplacer = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9_ -]/g, '').replace(/[ -]/g, '_');

const convertMarkdownContent = function(content_: string): string {
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

const requestPage = async function(pageName: string): Promise<string | null> {
  try {
    const response = await axios.get(`pages/${pageName}.md`, {
      baseURL: window.location.origin + window.location.pathname
    });
    // console.log(response);

    const rawContent = <string> response.data;
    // console.log(rawContent);

    const content = convertMarkdownContent(rawContent);
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

    return pureHTMLContent;
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