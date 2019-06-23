import { Configuration } from 'webpack';

// tslint:disable:no-var-requires
const webpack = require('webpack');
const configuration = require('./webpack.config');

const dev: Configuration = Object.assign({}, configuration, {
  entry: {
    main: ['react-hot-loader/patch', configuration.entry.main],
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [...configuration.plugins, new webpack.HotModuleReplacementPlugin()],
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true
    },
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      errors: true,
      hash: false,
      modules: false,
      timings: false,
      version: false,
      warnings: true,
    },
    publicPath: configuration.output.publicPath,
    hot: true,
    compress: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
});
module.exports = dev;
// TS hack to avoid "cannot redeclare block scope variable webpack"
export {};
