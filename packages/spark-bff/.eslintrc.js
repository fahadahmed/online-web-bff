const path = require('path');

module.exports = {
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      // This replicates dependency resolution strategy for monorepo
      { packageDir: [__dirname, path.resolve(__dirname, '../..')] },
    ],
  },
};
