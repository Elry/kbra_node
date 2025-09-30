import request from 'supertest';
import { createApp } from '../app.js';

describe('App', () => {
  it('should return 404 for unknown routes', async () => {
    const app = createApp({});
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should return 200 for health check', async () => {
    const app = createApp({});
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});