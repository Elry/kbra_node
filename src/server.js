import config from './config/index.js';
import { initializeDatabase, closePool, createPersonQueries, pool } from './database/index.js';
import { createApp } from './app.js';

if (!config.isTest) {
  const startServer = async () => {
    const initialization = await initializeDatabase();
    if (!initialization.success) {
      console.error('🔴 Failed to initialize database:', initialization.error);
      process.exit(1);
    }

    const personQueries = createPersonQueries(pool);
    const app = createApp(personQueries);

    const server = app.listen(config.server.port, () => {
      console.log(`
        🚀 ${config.server.appName} running on port ${config.server.port} in ${config.nodeEnv} mode
      `);
    });

    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}, shutting down gracefully...`);
      
      server.close(async () => {
        console.log('✅ HTTP server closed');
        await closePool();
        console.log('✅ Database pool closed');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('🔴 Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    return server;
  };

  startServer().catch((error) => {
    console.error('🔴 Failed to start server:', error);
    process.exit(1);
  });
}

export { createApp };