import { jest } from '@jest/globals'
import { config } from 'dotenv'

// Load test environment variables - load multiple files as the warning suggested
config({ path: '.env.test', override: true })
config({ path: '.env', override: false }) // .env.test takes precedence

// Global test timeout
jest.setTimeout(10000)

// Set test environment
process.env.NODE_ENV = 'test'

// Mock console methods for cleaner test output
global.console = {
  ...console,
  // Uncomment to debug
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
}

// Clean up after all tests
afterAll(async () => {
  // Add any global cleanup here
})