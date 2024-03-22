const path = require('path');

module.exports = {
  displayName: 'spark-bff',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  setupFilesAfterEnv: [path.join(__dirname, 'src/test/setupTests.ts')],
  testResultsProcessor: 'jest-sonar-reporter',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
