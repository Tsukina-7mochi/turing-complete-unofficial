import path from 'path';
import fs from 'fs';
import { Configuration } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import generateMenuHTML from './webpack/menu';
import loadMarkdown from './webpack/loadMarkdown';
import { pageInfo, toLinkName } from './webpack/pageInfo';

const srcPath = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'dist');
const docsPath = path.join(__dirname, 'docs');

const menu = generateMenuHTML();

const loadPages4HTMLWebpackPlugin = function (): HTMLWebpackPlugin[] {
  const pageNameFileExists = Object.keys(pageInfo.pages).filter((pageName) => {
    return fs.existsSync(
      path.join(docsPath, 'pages', pageInfo.pages[pageName].filename)
    );
  });

  return pageNameFileExists.map(
    (pageName) =>
      new HTMLWebpackPlugin({
        filename: path.join(destPath, toLinkName(pageName) + '.html'),
        template: path.join(docsPath, 'template.hbs'),
        inject: false,
        templateParameters: {
          title:
            pageName === 'index'
              ? 'Turing Complete Unofficial'
              : pageName + ' | Turing Complete Unofficial',
          menu: menu,
          content: loadMarkdown(pageName),
        },
      })
  );
};

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
                fiber: false,
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          runtime: path.resolve('./webpack/handlebars'),
        },
      },
    ],
  },
  entry: {
    main: path.join(srcPath, 'main.ts'),
    mathWorker: path.join(srcPath, 'mathWorker.ts'),
  },
  plugins: [...loadPages4HTMLWebpackPlugin()],
  output: {
    filename: '[name].bundle.js',
    path: destPath,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    mainFields: ['module', 'main', 'browser'],
    fallback: {
      path: false,
      fs: false,
    },
  },
  stats: {
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};

export default config;
