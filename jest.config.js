module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  moduleNameMapper: {
    '@uni-component/(.*)': ['<rootDir>/packages/$1/src'],
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,jsx,ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/example/',
    // ignore mpx fornow
    '/packages\/mpx/',
    '\\.d\\.ts$'
  ],
  testMatch: [
    // '<rootDir>/packages/**/__tests__/*spec.[jt]s?(x)'
    '<rootDir>/packages/components/__tests__/block.spec.[jt]s?(x)'
  ],
  transform: {
    '^.+\\.tsx?$': './jest-ts-transform',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './jest-file-transform'
  },
  rootDir: __dirname,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`]
}
