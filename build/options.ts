import fs from 'node:fs';
import path from 'node:path';
import * as esbuild from 'esbuild';
import { glob } from 'glob';
import Handlebars from 'handlebars';
import JSON5 from 'json5';
import buildResultPlugin from './plugins/buildResultPlugin';
import sassPlugin from './plugins/sassPlugin';
import loaderHookPlugin from './plugins/loaderHookPlugin';
import renderMenu from './renderMenu';
import renderMarkdown from './renderMarkdown';
import { PageInfo, toLinkName } from './pageInfo';

const srcPath = path.join(__dirname, '../src');
const destPath = path.join(__dirname, '../dist');
const docsPath = path.join(__dirname, '../docs');
const decoder = new TextDecoder();

const pageInfoData = fs.readFileSync(path.join(docsPath, 'page_info.json5'));
const pageInfoText = decoder.decode(pageInfoData);
const pageInfo = JSON5.parse<PageInfo>(pageInfoText);

const hbsTemplateData = fs.readFileSync(path.join(docsPath, 'template.hbs'));
const hbsTemplateText = decoder.decode(hbsTemplateData);
const hbsTemplate = Handlebars.compile(hbsTemplateText);

const menuHTML = renderMenu(pageInfo);
const pages = Object.keys(pageInfo.pages).map((pageName) => {
  const page = pageInfo.pages[pageName];
  const filePath = path.join(docsPath, 'pages', page.filename);

  return {
    name: pageName,
    path: filePath,
    outPath: path.join(destPath, `${toLinkName(pageInfo, pageName)}.html`),
  }
}).filter((page) => fs.existsSync(page.path));
type ArrayItem<T> = T extends (infer S)[] ? S : never;
const pageFilePathMap = new Map<string, ArrayItem<typeof pages>>();
for(const page of pages) {
  pageFilePathMap.set(page.path, page);
}

const pageOptions = (): esbuild.BuildOptions[] => {
  return pages.map((page) => ({
    entryPoints: [page.path],
    outfile: page.outPath,
    plugins: [
      buildResultPlugin({
        buildName: `page(${page.name})`,
        rebuildOnly: true,
      }),
      loaderHookPlugin({
        paths: pages.map((page) => page.path),
        preprocess: (async (path, content) => {
          const pageName = pageFilePathMap.get(path)?.name as string;
          return renderMarkdown(pageInfo, pageName, content, menuHTML, hbsTemplate)
        }),
        loader: 'copy',
        log: true
      }),
    ],
  }));
}

const srcOption = (dev?: boolean): esbuild.BuildOptions => ({
  entryPoints: [
    { in: path.join(srcPath, 'main.ts'), out: 'main.bundle' },
    {
      in: path.join(srcPath, 'mathWorker.ts'),
      out: 'mathWorker.bundle'
    },
    {
      in: path.join(srcPath, 'style', 'main.scss'),
      out: 'main.bundle'
    }
  ],
  outdir: destPath,
  bundle: true,
  platform: 'browser',
  loader: {
    '.svg': 'file',
  },
  plugins: [
    buildResultPlugin({
      buildName: 'sources',
    }),
    sassPlugin(),
  ],
  minify: !dev,
  sourcemap: dev ? 'inline' : 'linked'
});

export { pageOptions, srcOption };
