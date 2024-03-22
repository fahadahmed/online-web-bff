module.exports = {
  projects: ['<rootDir>/packages/*'],
  testResultsProcessor: 'jest-sonar-reporter',
  testTimeout: 20000,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
