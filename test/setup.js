import { jest } from '@jest/globals';
import { config } from 'dotenv';

// .test loads first
config({ path: '.env.test', override: true });
config({ path: '.env', override: false });

jest.setTimeout(10000);

process.env.NODE_ENV = 'test';

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}

afterAll(async () => {
  // TODO - global cleanup?
});
