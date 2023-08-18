import * as esbuild from 'esbuild';
import path from 'node:path';
import { glob } from 'glob';
import buildResultPlugin from './plugins/buildResultPlugin';
import sassPlugin from './plugins/sassPlugin';
import loaderHookPlugin from './plugins/loaderHookPlugin';

const srcPath = path.join(__dirname, '../src');
const destPath = path.join(__dirname, '../dist');

// const copyFiles = glob.globSync(path.join(__dirname, '../docs/**/*.md'));
const copyFiles = [path.join(__dirname, '../docs/template.hbs')];

const option = (dev: boolean): esbuild.BuildOptions => ({
  entryPoints: [
    ...copyFiles
  ],
  outdir: destPath,
  bundle: true,
  platform: 'browser',
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  loader: {},
  plugins: [
    buildResultPlugin(),
    sassPlugin(),
    loaderHookPlugin({
      paths: copyFiles,
      loader: 'copy',
      log: true
    }),
  ],
  minify: !dev,
  sourcemap: dev ? 'inline' : 'linked',
});

export default option;
