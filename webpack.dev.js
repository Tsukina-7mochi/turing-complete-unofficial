/* eslint-env node */
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval',
  watchOptions: {
    ignored: /(node_modules)/,
    poll: true
  }
});