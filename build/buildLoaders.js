const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function buildLoaders(isDev) {
  return [
    {
      test: /\.js$/i,
      use: 'babel-loader',
      exclude: '/node_modules/', //папка исключение
    },
    {
      test: /\.css$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
  ]
};

module.exports = { buildLoaders };
