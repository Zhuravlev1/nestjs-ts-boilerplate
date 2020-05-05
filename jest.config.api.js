module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/migrations/**',
    '!src/**/dto/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
