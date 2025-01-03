const path = require('path');

function buildResolvers() {
  return {
    alias: {
      '@components': path.resolve(__dirname, '../src/components/'),
      '@utils': path.resolve(__dirname, '../src/utils/'),
    },
    extensions: ['.js', '.jsx', '.json']
  }
}

module.exports = { buildResolvers }
