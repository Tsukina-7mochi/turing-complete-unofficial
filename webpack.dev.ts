import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

export default merge<Configuration>(commonConfig, {
  mode: 'development',
  devtool: 'eval',
  watchOptions: {
    ignored: /(node_modules)/,
    poll: true
  }
});