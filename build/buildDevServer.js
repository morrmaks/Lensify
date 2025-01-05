const path = require('path');

function buildDevServer() {
  return { //настройки локального сервера
    static: path.resolve(__dirname,'./dist'), //к чему подключен локальный сервер
    port: 8080,
    compress: true, //сжатие файлов
    hot: true, //включен режим HMR
    open: true, //автоматическое открытие страницы в браузере после вызова скрипта
    watchFiles: ['src/**/*.html'], //для обновления HTML в HMR режиме
  }
};

module.exports = { buildDevServer };
