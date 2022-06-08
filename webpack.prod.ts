import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

export default merge<Configuration>(commonConfig, {
  mode: 'production',
  devtool: 'source-map'
});
