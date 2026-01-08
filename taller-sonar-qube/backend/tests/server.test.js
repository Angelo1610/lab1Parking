const request = require('supertest');
const app = require('../server');

describe('Server Error Handling', () => {
  it('should handle 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
  });

  it('should have CORS headers', async () => {
    const res = await request(app).get('/zones');
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  it('should support OPTIONS for CORS preflight', async () => {
    const res = await request(app).options('/zones');
    expect(res.headers['access-control-allow-methods']).toContain('GET');
  });
});
