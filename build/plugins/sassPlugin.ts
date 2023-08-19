import * as esbuild from 'esbuild';
import path from 'node:path';
import url from 'node:url';
import sass from 'sass';

interface Option {
  compileOptions: sass.Options<'async'>;
}

const urlToString = function (url_: URL) {
  if (url_.protocol !== 'file') {
    return url_.toString();
  }

  return url.fileURLToPath(url_);
};

/**
 * A plugin to process `.sass` and `.scss` files.
 */
const sassPlugin = (option?: Option): esbuild.Plugin => ({
  name: 'sass-plugin',
  setup(build) {
    build.onLoad({ filter: /\.(scss|sass)$/ }, async (args) => {
      const filePath = path.resolve(args.path);
      const compileOption = option?.compileOptions ?? {};
      const compileResult = await sass.compileAsync(filePath, compileOption);

      return {
        contents: compileResult.css,
        loader: 'css',
        watchFiles: compileResult.loadedUrls.map(urlToString),
      };
    });
  },
});

export default sassPlugin;
