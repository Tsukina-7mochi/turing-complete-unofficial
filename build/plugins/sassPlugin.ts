import * as esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';
import url from 'node:url';
import sass from 'sass';

interface Option {
  compileOptions: sass.Options<"async">
}

const urlToString = function(url_: URL) {
  if(url_.protocol !== 'file') {
    return url_.toString();
  }

  return url.fileURLToPath(url_);
}

/**
 * A plugin to process `.sass` and `.scss` files.
 */
const sassPlugin = (option?: Option): esbuild.Plugin => ({
  name: 'sass-plugin',
  setup(build) {
    build.onResolve({ filter: /\.(scss|sass)$/ }, async (args) => {
      const compileOption = option?.compileOptions ?? {};
      const compileResult = await sass.compileAsync(args.path, compileOption);

      return {
        contents: compileResult.css,
        watchFiles: compileResult.loadedUrls.map(urlToString),
      }
    });
  }
});

export default sassPlugin;
