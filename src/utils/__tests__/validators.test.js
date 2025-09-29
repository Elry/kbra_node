import { validateId, validatePersonData, validateFilterData } from '../validators.js'

describe('Validators', () => {
  describe('validateId', () => {
    it('should validate numeric ID', () => {
      const result = validateId('123')
      expect(result).toEqual({ valid: true, id: 123 })
    })

    it('should reject non-numeric ID', () => {
      const result = validateId('abc')
      expect(result).toEqual({ valid: false, error: 'Invalid ID format' })
    })

    it('should reject decimal numbers', () => {
      const result = validateId('123.45')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Invalid ID format')
    })

    it('should reject empty string', () => {
      const result = validateId('')
      expect(result.valid).toBe(false)
    })

    it('should reject null', () => {
      const result = validateId(null)
      expect(result.valid).toBe(false)
    })
  });

  describe('validatePersonData', () => {
    it('should validate complete person data', () => {
      const person = { firstName: 'John', lastName: 'Doe' }
      const result = validatePersonData(person)
      expect(result).toEqual({ 
        valid: true, 
        data: { firstName: 'John', lastName: 'Doe' } 
      })
    })

    it('should trim whitespace from names', () => {
      const person = { firstName: '  John  ', lastName: '  Doe  ' }
      const result = validatePersonData(person)
      expect(result.data).toEqual({ firstName: 'John', lastName: 'Doe' })
    })

    it('should reject missing firstName', () => {
      const person = { lastName: 'Doe' }
      const result = validatePersonData(person)
      expect(result.valid).toBe(false)
    })

    it('should reject missing lastName', () => {
      const person = { firstName: 'John' }
      const result = validatePersonData(person)
      expect(result.valid).toBe(false)
    })

    it('should reject non-string values', () => {
      const person = { firstName: 123, lastName: 'Doe' }
      const result = validatePersonData(person)
      expect(result.valid).toBe(false)
    })

    it('should reject empty strings', () => {
      const person = { firstName: '', lastName: 'Doe' }
      const result = validatePersonData(person)
      expect(result.valid).toBe(false)
    })

    it('should reject names longer than 100 characters', () => {
      const longName = 'a'.repeat(101)
      const person = { firstName: 'John', lastName: longName }
      const result = validatePersonData(person)
      expect(result.valid).toBe(false)
    })
  })

  describe('validateFilterData Utility', () => {
    it('should return a sanitized object with trimmed names for a valid query', () => {
      const query = { firstName: '  Jane  ', lastName: '  Smith  ' };
      const result = validateFilterData(query);
      expect(result).toEqual({ firstName: 'Jane', lastName: 'Smith' });
    });

    it('should return an object with only the valid field if another is missing', () => {
      const query = { lastName: '  Smith  ' };
      const result = validateFilterData(query);
      expect(result).toEqual({ lastName: 'Smith' });
    });

    it('should return an empty object if query names are empty strings or just whitespace', () => {
      const query = { firstName: '   ', lastName: '' };
      const result = validateFilterData(query);
      expect(result).toEqual({});
    });

    it('should ignore non-string properties and extra params in the query', () => {
      const query = { firstName: 'Jane', age: 30, extra: true };
      const result = validateFilterData(query);
      expect(result).toEqual({ firstName: 'Jane' });
    });

    it('should return an empty object for an empty query object', () => {
      const query = {};
      const result = validateFilterData(query);
      expect(result).toEqual({});
    });
  });
});