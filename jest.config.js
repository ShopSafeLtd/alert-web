module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  ignorePatterns: ['.eslintrc.js'],
};
