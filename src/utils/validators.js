// Pure validation functions
export const validateId = (id) => {
  // Check if the string contains a decimal point
  if (typeof id === 'string' && id.includes('.')) {
    return { valid: false, error: 'Invalid ID format' }
  }
  
  const parsedId = Number.parseInt(id, 10)
  return Number.isNaN(parsedId)
    ? { valid: false, error: 'Invalid ID format' }
    : { valid: true, id: parsedId }
}

export const validatePersonData = (person) => {
  const { firstName, lastName } = person

  if (!firstName || !lastName) {
    return { valid: false, error: 'First name and last name are required' }
  }

  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    return { valid: false, error: 'First name and last name must be strings' }
  }

  if (firstName.trim().length === 0 || lastName.trim().length === 0) {
    return { valid: false, error: 'First name and last name cannot be empty' }
  }

  if (firstName.length > 100 || lastName.length > 100) {
    return { valid: false, error: 'First name and last name must be less than 100 characters' }
  }

  return { 
    valid: true, 
    data: { 
      firstName: firstName.trim(), 
      lastName: lastName.trim() 
    } 
  }
};

/**
 * Validates and sanitizes filter data from a query object.
 * This is a pure function with no side effects.
 *
 * @param {object} query - The request query object from Express.
 * @returns {object} A sanitized filters object.
 */
export const validateFilterData = (query) => {
  const { firstName, lastName } = query;
  const filters = {};

  if (firstName && typeof firstName === 'string' && firstName.trim().length > 0) {
    filters.firstName = firstName.trim();
  }

  if (lastName && typeof lastName === 'string' && lastName.trim().length > 0) {
    filters.lastName = lastName.trim();
  }

  return filters;
};
