const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

function buildPlugins(isProd) {
  return [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        favicon: path.resolve(__dirname, '../public/logo-Lensify_favicon.svg'),
      }),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css', //в отдельную папку
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new CleanWebpackPlugin(),
      new Dotenv(),
    ].filter(Boolean)
};

module.exports = { buildPlugins };
