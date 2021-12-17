module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  moduleNameMapper: {
    "@uni-component/(.*)": ["<rootDir>/packages/$1/src"]
  },
  collectCoverageFrom: [
    'packages/*/src/*.ts'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/example/',
    // ignore mpx fornow
    '/packages\/mpx/',
    '\\.d\\.ts$'
  ],
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'
    // '<rootDir>/packages/core/__tests__/**/*spec.[jt]s?(x)'
  ],
  transform: {
    '^.+\\.tsx?$': './jest-ts-transform',
  },
  rootDir: __dirname,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`]
}
