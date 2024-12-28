const path = require('path');
const { buildPlugins } = require('./build/buildPlugins');
const { buildDevServer } = require('./build/buildDevServer');
const { buildLoaders } = require('./build/buildLoaders');
const { buildResolvers } = require('./build/buildResolvers');

module.exports = (env) => { //передает переменную окружения
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  return {
    entry: './src/index.js', //откуда строить зависимости
    output: {
      path: path.resolve(__dirname, 'dist'), //путь к папке, где собирать финальный бандл
      filename: '[name].[contenthash].js', //имя файла финального бандла
    },
    mode: env.mode ?? 'development', //если режим не задан, то режим разработки
    devtool: "source-map", //генерация исходных карт в devtools браузера
    devServer: buildDevServer(),
    module: {
      rules: buildLoaders(isDev),
    },
    plugins: buildPlugins(isProd),
    resolve: buildResolvers(),
  }
};
