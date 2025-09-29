import { jest } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../../src/app.js';

const createMockQueries = () => ({
  getPersonById: jest.fn(),
  getPersons: jest.fn(),
  createPerson: jest.fn()
});

describe('Kbra API Integration Tests', () => {
  let mockQueries;
  let app;

  beforeEach(() => {
    mockQueries = createMockQueries();
    app = createApp(mockQueries);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /person/:id', () => {
    it('should return person by ID', async () => {
      const mockPerson = { id: 1, first_name: 'Mickey', last_name: 'Mouse' };
      mockQueries.getPersonById.mockResolvedValue(mockPerson);

      const response = await request(app)
        .get('/person/1')
        .expect(200);

      expect(response.body).toEqual(mockPerson);
      expect(mockQueries.getPersonById).toHaveBeenCalledWith(1);
    });

    it('should return 404 for non-existent person', async () => {
      mockQueries.getPersonById.mockResolvedValue(null);

      const response = await request(app)
        .get('/person/999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Person not found');
    });
  });
});
