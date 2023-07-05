module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  testTimeout: 10000,
  testMatch: ['**/*.spec.ts'], // Specify the test file pattern
  collectCoverageFrom: ['./**/*.ts'], // Specify the source files to collect coverage from
};
