import logger from '../logger.js';

describe('Logger', () => {
  it('should be an object', () => {
    expect(typeof logger).toBe('object');
  });

  it('should have info, error, warn, and debug methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.debug).toBe('function');
  });
});