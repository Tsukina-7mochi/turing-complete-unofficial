import * as esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';
import { glob } from 'glob';

interface Option {
  baseDir?: string;
  baseOutDir?: string;
  ignoreDirs?: string[];
  files: {
    from: string;
    to: string;
  }[];
  outputLog?: boolean;
}

/**
 * A plugin that copies files specified by `option`. Example:
 * ```
 * copyPlugin({
 *   // base directory of source files
 *   baseDir: './src',
 *   // base directory of destination files
 *   baseOutDir: './dist',
 *   // directory ignored by wild card (see: npm:glob)
 *   ignoreDirs: ['./cache'],
 *   // files should be copied
 *   files: [
 *     { from: 'imgs/*', to: 'imgs/[name].[ext]' },
 *     { from: 'wasm/*', to: 'wasm/[name].[ext]' },
 *   ]
 * })
 * ```
 */
const copyPlugin = (option: Option): esbuild.Plugin => {
  const baseDir = option.baseDir ?? '.';
  const baseOutDir = option.baseOutDir ?? '.';
  const ignoreDirs = ['node_modules', ...(option.ignoreDirs ?? [])];

  return {
    name: 'copy-plugin',
    setup(build) {
      build.onStart(async () => {
        // directories that must be ensured to exist
        const ensureDirNames: Set<string> = new Set();
        const copyFiles: { src: string; dest: string }[] = [];

        for (const file of option.files) {
          const fromFileGlob = path.isAbsolute(file.from)
            ? file.from
            : path.resolve(baseDir, file.from);
          const fromFiles = await glob(fromFileGlob, {
            ignore: ignoreDirs,
          });

          for (const fromFile_ of fromFiles) {
            const fromFile = path.resolve(fromFile_);
            if (!(await fs.stat(fromFile)).isFile()) {
              continue;
            }

            // relative path from `baseDir`
            const dirname = path.dirname(path.relative(baseDir, fromFile));
            const name = path.basename(fromFile).replace(/\.[^/.]+$/, '');
            const ext = path.extname(fromFile);
            const toFile = path.resolve(
              baseOutDir,
              file.to
                .replace('[path]', dirname)
                .replace('[name]', name)
                .replace('[ext]', ext)
            );

            ensureDirNames.add(path.dirname(toFile));
            copyFiles.push({ src: fromFile, dest: toFile });
          }
        }

        if (option.outputLog) {
          ensureDirNames.forEach((dirname) => {
            console.log(`ensure: ${dirname}`);
          });
          copyFiles.forEach(({ src, dest }) => {
            console.log(`copy: ${src} -> ${dest}`);
          });
        }

        // ensure that all output directory exist
        await Promise.all(
          Array.from(ensureDirNames).map((dirname) =>
            fs.mkdir(dirname, {
              recursive: true,
            })
          )
        );

        // copy files
        await Promise.all(
          copyFiles.map(({ src, dest }) => fs.copyFile(src, dest))
        );
      });
    },
  };
};

export default copyPlugin;
