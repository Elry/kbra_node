import pg from 'pg'
import config from '../config/index.js';

const { Pool } = pg

export const createPool = (dbConfig = config.database) => new Pool(dbConfig)
export const pool = createPool()

export const initializeDatabase = async (poolInstance = pool) => {
  // Don't try to connect in test environment
  if (config.isTest) {
    console.log('Skipping database connection in test environment')
    return { success: true }
  }

  try {
    await poolInstance.connect()
    console.log('Connected to PostgreSQL database')
    return { success: true }
  } catch (error) {
    console.error('Database connection error', error.stack)
    return { success: false, error }
  }
}

export const closePool = (poolInstance = pool) => {
  if (!config.isTest) {
    return poolInstance.end()
  }
  return Promise.resolve()
}

export const healthCheck = async (poolInstance = pool) => {
  if (config.isTest) {
    return { healthy: true, result: { health_check: 1 } }
  }

  try {
    const result = await poolInstance.query('SELECT 1 as health_check')
    return { healthy: true, result: result.rows[0] }
  } catch (error) {
    return { healthy: false, error: error.message }
  }
}