import { pool } from '../src/database/conn.js';

const createExtension = async () => {
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
    console.log('pg_trgm extension created');
  } catch (error) {
    console.error('Error creating pg_trgm extension:', error);
  } finally {
    pool.end();
  }
};

createExtension();