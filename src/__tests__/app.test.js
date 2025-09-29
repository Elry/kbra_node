import { jest } from '@jest/globals'
import request from 'supertest'
import { createApp } from '../app.js'

// Mock database queries
const createMockQueries = () => ({
  getPersonById: jest.fn(),
  getPersons: jest.fn(),
  createPerson: jest.fn()
});

describe('App', () => {
  let mockQueries;
  let app;

  beforeEach(() => {
    mockQueries = createMockQueries();
    app = createApp(mockQueries);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    })
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    })
  });
});
