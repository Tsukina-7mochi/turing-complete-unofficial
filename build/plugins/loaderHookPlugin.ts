import * as esbuild from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';

interface Option {
  paths: (string | RegExp)[],
  loader: esbuild.Loader,
  limitToEntry?: boolean,
  preprocess?: (path: string, content: string) => string | Promise<string>,
  encoding?: BufferEncoding,
  log?: boolean,
}

const pluginNamespace = 'net.ts7m.esbuild-plugin-loader-hook';

const stringToRegExpFullMatch = function(str: string){
  const escapedStr = str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  return new RegExp(`^${escapedStr}\$`);
}

const loaderHookPlugin = (options: Option): esbuild.Plugin => ({
  name: 'copy-hook-plugin',
  setup(build) {
    for(const targetPath of options.paths) {
      const filter = (targetPath instanceof RegExp ? targetPath : stringToRegExpFullMatch(targetPath));

      build.onResolve({ filter }, (args) => {
        if(options.limitToEntry && args.kind !== 'entry-point') {
          return;
        }

        return {
          path: args.path,
          namespace: pluginNamespace
        }
      });

      build.onLoad({ filter, namespace: pluginNamespace }, async (args) => {
        const dirname = path.dirname(args.path);
        let [contents]: [Buffer | string, unknown] = await Promise.all([
          fs.readFile(args.path),
          fs.mkdir(dirname, { recursive: true }),
        ]);

        if(options.preprocess !== undefined) {
          contents = await options.preprocess(
            args.path,
            contents.toString(options.encoding)
          );
        }

        return {
          contents,
          loader: options.loader
        };
      });
    }
  }
});

export default loaderHookPlugin;
