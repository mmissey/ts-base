import { Configuration } from 'webpack';

// tslint:disable:no-var-requires
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const configuration = require('./webpack.config') as Configuration;
const RELEASE = `${Date.now()}`;

const prod: Configuration = Object.assign({}, configuration, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 30000,
      cacheGroups: {
        default: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      }
    }
  },
  plugins: [
    ...configuration.plugins,
    new CopyWebpackPlugin([{ from: 'public' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.RELEASE': RELEASE,
    }),
    new webpack.ExtendedAPIPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'disabled' : 'static',
    }),
  ],
});

module.exports = prod;
// TS hack to avoid "cannot redeclare block scope variable webpack"
export {};
