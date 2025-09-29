import { jest } from '@jest/globals';
import { buildPersonQuery, createPersonQueries } from '../queries.js';

describe('Database Queries', () => {
  describe('buildPersonQuery', () => {
    it('should build query without filters', () => {
      const result = buildPersonQuery();
      expect(result.query).toBe('SELECT * FROM persons WHERE 1=1');
      expect(result.values).toEqual([]);
    });

    it('should build query with firstName filter', () => {
      const result = buildPersonQuery({ firstName: 'John' });
      expect(result.query).toContain('AND first_name ILIKE $1');
      expect(result.values).toEqual(['%John%']);
    });

    it('should build query with lastName filter', () => {
      const result = buildPersonQuery({ lastName: 'Doe' });
      expect(result.query).toContain('AND last_name ILIKE $1');
      expect(result.values).toEqual(['%Doe%']);
    });

    it('should build query with both filters', () => {
      const result = buildPersonQuery({ firstName: 'John', lastName: 'Doe' });
      expect(result.query).toContain('AND first_name ILIKE $1');
      expect(result.query).toContain('AND last_name ILIKE $2');
      expect(result.values).toEqual(['%John%', '%Doe%']);
    });
  });

  describe('createPersonQueries', () => {
    const mockPool = {
      query: jest.fn()
    };

    const queries = createPersonQueries(mockPool);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create all query methods', () => {
      expect(queries.getPersonById).toBeDefined();
      expect(queries.getPersons).toBeDefined();
      expect(queries.createPerson).toBeDefined();
    });

    describe('getPersonById', () => {
      it('should call pool.query with correct parameters', async () => {
        const expectedPerson = { id: 1, first_name: 'John', last_name: 'Doe' };
        mockPool.query.mockResolvedValueOnce({ rows: [expectedPerson] });

        const result = await queries.getPersonById(1);

        expect(mockPool.query).toHaveBeenCalledWith(
          'SELECT * FROM persons WHERE id = $1',
          [1]
        );
        expect(result).toEqual(expectedPerson);
      });

      it('should return undefined when person not found', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const result = await queries.getPersonById(999);

        expect(result).toBeUndefined();
      });
    });

    describe('createPerson', () => {
      it('should call pool.query with correct parameters', async () => {
        const newPerson = { firstName: 'John', lastName: 'Doe' };
        const expectedResult = { id: 1, first_name: 'John', last_name: 'Doe' };
        mockPool.query.mockResolvedValueOnce({ rows: [expectedResult] });

        const result = await queries.createPerson(newPerson);

        expect(mockPool.query).toHaveBeenCalledWith(
          'INSERT INTO persons (first_name, last_name) VALUES ($1, $2) RETURNING *',
          ['John', 'Doe']
        );
        expect(result).toEqual(expectedResult);
      })
    });
  });
});
