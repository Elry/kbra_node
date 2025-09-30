import { pool } from '../src/database/conn.js';

const createTrigramIndexes = async () => {
  try {
    await pool.query('CREATE INDEX IF NOT EXISTS persons_first_name_trgm_idx ON persons USING gin (first_name gin_trgm_ops)');
    await pool.query('CREATE INDEX IF NOT EXISTS persons_last_name_trgm_idx ON persons USING gin (last_name gin_trgm_ops)');
    console.log('Trigram indexes created');
  } catch (error) {
    console.error('Error creating trigram indexes:', error);
  } finally {
    pool.end();
  }
};

createTrigramIndexes();