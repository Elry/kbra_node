import { jest } from '@jest/globals';

// Store the original process.env
const OLD_ENV = process.env;

// --- Mock the 'pg' library ---
// This is the single external dependency we need to control.
const mockPool = {
  connect: jest.fn(),
  query: jest.fn(),
  end: jest.fn(),
};
jest.mock('pg', () => ({
  Pool: jest.fn(() => mockPool),
}));
// --- End Mock ---

describe('Database Connection', () => {
  
  beforeEach(() => {
    // Reset modules before each test to reload config.js and conn.js
    jest.resetModules();
    // Restore a clean process.env
    process.env = { ...OLD_ENV };
    // Clear any previous mock calls
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original environment after all tests
    process.env = OLD_ENV;
  });

  describe('createPool', () => {
    it('should create a new Pool instance', async () => {
      // Set env for this specific test
      process.env.NODE_ENV = 'development';
      
      // Dynamically import the module to get the fresh version
      const { createPool } = await import('../conn.js');
      const pg = await import('pg');
      
      createPool();
      
      // Verify that the Pool constructor from 'pg' was called
      expect(pg.Pool).toHaveBeenCalled();
    });
  });

  describe('initializeDatabase', () => {
    it('should return success in test environment without connecting', async () => {
      process.env.NODE_ENV = 'test';
      const { initializeDatabase } = await import('../conn.js');

      const result = await initializeDatabase();

      expect(result).toEqual({ success: true });
      expect(mockPool.connect).not.toHaveBeenCalled();
    });

    it('should resolve successfully in a non-test environment', async () => {
      process.env.NODE_ENV = 'development';
      const { initializeDatabase } = await import('../conn.js');
      
      // Make the mock function resolve successfully
      mockPool.connect.mockResolvedValue(true);

      const result = await initializeDatabase(mockPool);

      expect(result).toEqual({ success: true });
      expect(mockPool.connect).toHaveBeenCalled();
    });

    it('should return failure when connection fails in a non-test environment', async () => {
      process.env.NODE_ENV = 'development';
      const { initializeDatabase } = await import('../conn.js');
      
      const mockError = new Error('Connection failed');
      // Make the mock function reject with an error
      mockPool.connect.mockRejectedValue(mockError);

      const result = await initializeDatabase(mockPool);

      expect(result).toEqual({ success: false, error: mockError });
      expect(mockPool.connect).toHaveBeenCalled();
    });
  });

  describe('healthCheck', () => {
    it('should return a mock healthy status in test environment', async () => {
      process.env.NODE_ENV = 'test';
      const { healthCheck } = await import('../conn.js');
      
      const result = await healthCheck();
      
      expect(result).toEqual({ healthy: true, result: { health_check: 1 } });
      expect(mockPool.query).not.toHaveBeenCalled();
    });

    it('should return healthy when query succeeds in a non-test environment', async () => {
      process.env.NODE_ENV = 'development';
      const { healthCheck } = await import('../conn.js');

      const mockDbResult = { rows: [{ health_check: 1 }] };
      mockPool.query.mockResolvedValue(mockDbResult);
      
      const result = await healthCheck(mockPool);

      expect(result).toEqual({ healthy: true, result: { health_check: 1 } });
      expect(mockPool.query).toHaveBeenCalledWith('SELECT 1 as health_check');
    });

    it('should return unhealthy when query fails in a non-test environment', async () => {
      process.env.NODE_ENV = 'development';
      const { healthCheck } = await import('../conn.js');
      
      const mockError = new Error('Query failed');
      mockPool.query.mockRejectedValue(mockError);
      
      const result = await healthCheck(mockPool);
      
      expect(result).toEqual({ healthy: false, error: 'Query failed' });
      expect(mockPool.query).toHaveBeenCalledWith('SELECT 1 as health_check');
    });
  });
});