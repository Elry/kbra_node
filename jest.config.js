export default {
  testEnvironment: 'node',
  transform: {},
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/test/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  }
}