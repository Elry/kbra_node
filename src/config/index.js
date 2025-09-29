import { config as loadDotenv } from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';

const filesToLoad = ['.env'];

if (nodeEnv === 'test') {
  filesToLoad.push('.env.test');
}

filesToLoad.forEach(file => {
  loadDotenv({ path: file });
});

const config = {
  nodeEnv: nodeEnv,
  isTest: nodeEnv === 'test',

  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    appName: process.env.APP_NAME || 'Kbra API',
  },
  
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  }
};

export default Object.freeze(config);