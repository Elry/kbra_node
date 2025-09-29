import express from 'express';
import { createPersonRoutes } from './routes/persons.js';
import { createPersonController } from './controllers/persons.js';

// Application factory
export const createApp = personQueries => {
  const app = express();
  app.use(express.json());

  // h-check
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  });

  // controllers injection
  const personController = createPersonController(personQueries);

  // route definitions
  app.use('/person', createPersonRoutes(personController));

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
  });

  // general error catcher
  /* eslint-disable-next-line no-unused-vars */
  app.use((error, req, res, next) => {
    console.error('Unhandled error:', error)
    res.status(500).json({ error: 'Internal server error' })
  });

  return app;
};
