module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'given2/setup',
    'jest-plugin-context/setup',
    './jest.setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@fixtures/(.*)': '<rootDir>/fixtures/$1',
  },
};
