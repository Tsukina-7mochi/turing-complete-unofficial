/* eslint-env node */
const path = require('path');

const srcPath  = path.join(__dirname, 'app');
const destPath = path.join(__dirname, 'docs/app');

module.exports = {
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
          }
        ]
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
                fiber: false
              },
              sourceMap: true,
            },
          }
        ],
      },
      {
        test: /.ts$/,
        use: 'ts-loader'
      },
      {
        test: /.(svg|png|jpg|jpeg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  entry: {
    main: path.join(srcPath, 'main.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: destPath,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    mainFields: ['module', 'main', 'browser'],
    fallback: {
      path: false,
      fs: false
    }
  },
  stats: {
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
  }
}