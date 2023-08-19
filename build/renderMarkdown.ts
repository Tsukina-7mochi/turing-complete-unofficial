import * as markdown from 'markdown-wasm';
import DOMPurify from 'isomorphic-dompurify';
import Handlebars from 'handlebars';
import htmlMinifier from 'html-minifier';
import { PageInfo, toLinkName, Page as PageInfoPage } from './pageInfo';
import SimpleHTMLElement from './simpleHTMLElement';
import { createElement, createList } from './simpleHTMLElementUtil';

const encoder = new TextEncoder();
const toUTF8Array = (str: string) => encoder.encode(str);

const getPageDependents = function (pageInfo: PageInfo, pageName: string) {
  const dependents: string[] = [];

  for (const pageName_ in pageInfo.pages) {
    const page = pageInfo.pages[pageName];
    if (page.category === 'level' && page.dependencies?.includes(pageName)) {
      dependents.push(pageName_);
    }
  }

  return dependents;
};

const renderDependencyList = function (
  pageInfo: PageInfo,
  dependencies: string[],
  dependents: string[]
) {
  const elements: SimpleHTMLElement[] = [];

  if (dependencies.length > 0) {
    const elListItems = dependencies.map((pageName) => {
      return createElement('a', pageInfo.pages[pageName].title, 'page-link', {
        href: `${toLinkName(pageInfo, pageName)}.html`,
      });
    });
    elements.push(createElement('h2', '前提レベル'));
    elements.push(createList(elListItems));
  }

  if (dependents.length > 0) {
    const elListItems = dependents.map((pageName) => {
      return createElement('a', pageInfo.pages[pageName].title, 'page-link', {
        href: `${toLinkName(pageInfo, pageName)}.html`,
      });
    });
    elements.push(createElement('h2', 'このレベルを前提とするレベル'));
    elements.push(createList(elListItems));
  }

  return elements.map((element) => element.toString()).join('');
};

// pre-process markdown before turning it into HTML
const processMarkdown = function (
  content: string,
  pageInfo: PageInfo,
  pageName: string
) {
  const page = pageInfo.pages[pageName];

  return Promise.resolve(content)
    .then((content) => {
      // insert level dependency list into immediately before the first <h2>
      if (page.category !== 'level') {
        return content;
      }
      const dependents = getPageDependents(pageInfo, pageName);
      const dependencyHTML = renderDependencyList(
        pageInfo,
        page.dependencies ?? [],
        dependents
      );

      const insertPos = content.match(/^(##|<h2>)/m)?.index;
      if (typeof insertPos === 'number') {
        return (
          content.slice(0, insertPos) +
          dependencyHTML +
          '\n' +
          content.slice(insertPos)
        );
      } else {
        return content + dependencyHTML;
      }
    })
    .then((content) => {
      // replace link with no target
      return content.replace(/\[[^[]+\](?![(])/g, (str: string) => {
        const name = str.slice(1, -1);
        const linkName = toLinkName(pageInfo, name);

        return `<a href="${linkName}.html" class="page-link">${name}</a>`;
      });
    });
};

const renderMarkdown = function (
  pageInfo: PageInfo,
  pageName: string,
  content: string,
  menuHTML: string,
  hbsTemplate: Handlebars.TemplateDelegate
) {
  const onCodeBlock = (lang: string, content: markdown.UTF8Bytes) => {
    if (lang === 'truth_table') {
      return content;
    } else if (lang === 'latex') {
      const elOpen = toUTF8Array('<x-equation type="display">');
      const elClose = toUTF8Array('</x-equation>');
      const length = elOpen.length + content.length + elClose.length;

      // faster than spreading into normal array
      const resultArray = new Uint8Array(length);
      resultArray.set(elOpen, 0);
      resultArray.set(content, elOpen.length);
      resultArray.set(elClose, elOpen.length + content.length);
    }
    return content;
  };
  return Promise.resolve(content)
    .then((content) => {
      // pre-process markdown
      return processMarkdown(content, pageInfo, pageName);
    })
    .then((content) => {
      // parse markdown into HTML
      return markdown.parse(content, {
        parseFlags:
          markdown.ParseFlags.COLLAPSE_WHITESPACE |
          markdown.ParseFlags.TABLES |
          markdown.ParseFlags.STRIKETHROUGH |
          markdown.ParseFlags.LATEX_MATH_SPANS |
          markdown.ParseFlags.UNDERLINE,
        allowJSURIs: false,
        onCodeBlock,
      });
    })
    .then((content) => {
      // purify HTML
      return DOMPurify.sanitize(content, {
        ADD_TAGS: ['x-equation'],
      });
    })
    .then((content) => {
      // process handlebars
      return hbsTemplate({
        title:
          pageName === 'index'
            ? 'Turing Complete Unofficial'
            : pageName + ' | Turing Complete Unofficial',
        menu: menuHTML,
        content,
      });
    })
    .then((content) => {
      // minify HTML
      return htmlMinifier.minify(content, {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        conservativeCollapse: false,
        continueOnParseError: false,
        decodeEntities: false,
        html5: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        preserveLineBreaks: false,
        preventAttributesEscaping: true,
        removeAttributeQuotes: false,
        removeComments: true,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: false,
        useShortDoctype: false,
      });
    });
};

export default renderMarkdown;
