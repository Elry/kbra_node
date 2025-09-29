/**
 * 
 * @param {*} error 
 * @param {string} context
 * @returns {void}
 */
const handleDbError = (error, context) => {
  console.error(`Database error in ${context}:`, error);
  throw new Error('An unexpected database error occurred.'); 
};

/**
 * Pure function to build query (no side effects)
 * @param {object} filters 
 * @returns {object}
 */
export const buildPersonQuery = (filters = {}) => {
  let query = 'SELECT * FROM persons WHERE 1=1';
  const values = [];
  let paramCount = 0;

  const addFilter = (field, value) => {
    paramCount += 1;
    query += ` AND ${field} ILIKE $${paramCount}`;
    values.push(`%${value}%`);
  };

  if (filters.firstName) addFilter('first_name', filters.firstName);
  if (filters.lastName) addFilter('last_name', filters.lastName);

  return { query, values };
}

export const createPersonQueries = pool => ({
  /**
   * 
   * @param {string} id 
   * @returns {Promise<object|undefined>}
   */
  getPersonById: async id => {
    try {
      const result = await pool.query('SELECT * FROM persons WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      handleDbError(error, 'getPersonById');
    }
  },

  /**
   * 
   * @param {object} filters 
   * @returns {Promise<object[]>}
   */
  getPersons: async (filters = {}) => {
    try {
      const { query, values } = buildPersonQuery(filters);
      const result = await pool.query(query, values);

      return result.rows;
    } catch (error) {
      handleDbError(error, 'getPersons');
    }
  },

  /**
   * 
   * @param {{ firstName: string, lastName: string }} person
   * @returns {Promise<object>}
   */
  createPerson: async person => {
    try {
      const { firstName, lastName } = person;
      const result = await pool.query(
        'INSERT INTO persons (first_name, last_name) VALUES ($1, $2) RETURNING *',
        [firstName, lastName]
      );

      return result.rows[0];
    } catch (error) {
      handleDbError(error, 'createPerson');
    }
  }
});
