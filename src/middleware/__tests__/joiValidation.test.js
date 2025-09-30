import { jest } from '@jest/globals';
import { validatePerson, validateId, validateFilters } from '../joiValidation.js';

describe('Joi Validation Middleware', () => {
  describe('validatePerson', () => {
    it('should call next when validation passes', () => {
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };
      const res = {};
      const next = jest.fn();

      validatePerson(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 400 when validation fails', () => {
      const req = {
        body: {
          firstName: 'John',
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      validatePerson(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: '"lastName" is required' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateId', () => {
    it('should call next when validation passes', () => {
      const req = {
        params: {
          id: '1',
        },
      };
      const res = {};
      const next = jest.fn();

      validateId(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 400 when validation fails', () => {
      const req = {
        params: {
          id: 'a',
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      validateId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid ID format' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateFilters', () => {
    it('should call next when validation passes', () => {
      const req = {
        body: {
          firstName: 'John',
        },
      };
      const res = {};
      const next = jest.fn();

      validateFilters(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 400 when validation fails', () => {
      const req = {
        body: {
          firstName: 123,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      validateFilters(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: '\"firstName\" must be a string' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next even with no filters', () => {
        const req = {
            body: {},
          };
          const res = {};
          const next = jest.fn();
    
          validateFilters(req, res, next);
    
          expect(next).toHaveBeenCalled();
    })
  });
});
