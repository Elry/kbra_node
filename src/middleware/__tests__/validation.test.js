import { jest } from '@jest/globals';

// Assuming your middleware and validators are in the same file, as provided.
// If they are separate, adjust the import path accordingly.
import {
  validatePersonId,
  validateCreatePerson,
  validateListFilters,
} from '../validation.js';

describe('Validation Middleware (Integration)', () => {
  let mockReq, mockRes, mockNext;

  // Set up mock Express objects before each test
  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  // --- Tests for validatePersonId ---
  describe('validatePersonId', () => {
    it('should call next() and attach the validated ID for a valid numeric string', () => {
      mockReq.params.id = '123';

      validatePersonId(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockReq.validatedId).toBe(123);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return a 400 error for an invalid ID format', () => {
      mockReq.params.id = 'abc';

      validatePersonId(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid ID format' });
    });
  });

  // --- Tests for validateCreatePerson ---
  describe('validateCreatePerson', () => {
    it('should call next() and attach sanitized data for a valid person object', () => {
      mockReq.body = { firstName: '  John ', lastName: ' Doe  ' };

      validateCreatePerson(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      // It should attach the trimmed data
      expect(mockReq.validatedPerson).toEqual({ firstName: 'John', lastName: 'Doe' });
    });

    it('should return a 400 error if validation fails (e.g., missing field)', () => {
      mockReq.body = { firstName: 'John' }; // lastName is missing

      validateCreatePerson(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'First name and last name are required' });
    });
  });

  // --- Tests for validateListFilters ---
  describe('validateListFilters', () => {
    it('should call next() and attach sanitized filters from req.query', () => {
      mockReq.body = { firstName: '  Jane  ', extraParam: 'ignore' };

      validateListFilters(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockReq.validatedFilters).toEqual({ firstName: 'Jane' });
    });

    it('should call next() with an empty filters object if the query is empty', () => {
      mockReq.body = {};

      validateListFilters(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockReq.validatedFilters).toEqual({});
    });
  });
});
