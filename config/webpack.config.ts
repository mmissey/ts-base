import { Configuration } from 'webpack';

// tslint:disable:no-var-requires
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const configuration: Configuration = {
  entry: {
    main: path.join(__dirname, '..', '/src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    chunkFilename: '[name].[hash].bundle.js',
    filename: '[name].[hash].bundle.js',
    publicPath: process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/',
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|jpeg|gif|png)$/,
        loaders: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: !!process.env.ANALYZE,
            useCache: true
          }
        }

      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourcemaps: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__',
          propsMap: {
            fillRule: 'fill-rule',
            foo: 'bar',
          },
          xmlnsTest: /^xmlns.*$/,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '~': path.resolve(__dirname, '../src'),
    },
    symlinks: false
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'TypeScript Base App',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.EnvironmentPlugin({
      API_TARGET: 'development',
      IMGUR_CLIENT_ID: 'unset',
      BASE_PATH: '',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
};

module.exports = configuration;
