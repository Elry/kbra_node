import { pool, initializeDatabase, closePool, healthCheck, createPersonQueries } from '../index.js'

describe('Database Index', () => {
  it('should export pool', () => {
    expect(pool).toBeDefined()
  })

  it('should export initializeDatabase', () => {
    expect(initializeDatabase).toBeDefined()
    expect(typeof initializeDatabase).toBe('function')
  })

  it('should export closePool', () => {
    expect(closePool).toBeDefined()
    expect(typeof closePool).toBe('function')
  })

  it('should export healthCheck', () => {
    expect(healthCheck).toBeDefined()
    expect(typeof healthCheck).toBe('function')
  })

  it('should export createPersonQueries', () => {
    expect(createPersonQueries).toBeDefined()
    expect(typeof createPersonQueries).toBe('function')
  })
})