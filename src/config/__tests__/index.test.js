import { jest } from '@jest/globals';

describe('Application Configuration', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }; 
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should load default development values when no env vars are set', async () => {
    process.env.NODE_ENV = 'development';
    
    const configModule = await import('../index.js');
    const config = configModule.default;

    expect(config.nodeEnv).toBe('development');
    expect(config.isTest).toBe(false);
    expect(config.server.port).toBe(3001);
    expect(config.server.appName).toBe('Kbra API Test');
  });

  
  it('should override default values with environment variables', async () => {
    process.env.NODE_ENV = 'production';
    process.env.PORT = '8080';
    process.env.APP_NAME = 'My Production App';
    process.env.DB_HOST = 'prod-db.example.com';
    
    const configModule = await import('../index.js');
    const config = configModule.default;

    expect(config.nodeEnv).toBe('production');
    expect(config.server.port).toBe(8080); // Note: it should be a number
    expect(config.server.appName).toBe('My Production App');
    expect(config.database.host).toBe('prod-db.example.com');
  });

  it('should correctly identify the test environment', async () => {
    process.env.NODE_ENV = 'test';
    process.env.DB_NAME = 'person_db_test';
    
    const configModule = await import('../index.js');
    const config = configModule.default;
    
    expect(config.isTest).toBe(true);
    expect(config.nodeEnv).toBe('test');
    expect(config.database.database).toBe('person_db_test');
  });
});