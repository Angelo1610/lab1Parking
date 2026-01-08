const app = require('../server');
const request = require('supertest');
const createCrudTests = require('./testHelper');

describe('Zones API', createCrudTests({
  app,
  endpoint: '/zones',
  entityName: 'zones',
  sampleData: { 
    name: 'Test Zone', 
    description: 'Test Description' 
  },
  updateData: { 
    name: 'Updated Zone', 
    description: 'Updated Description' 
  }
}));

describe('Zones API - Additional Tests', () => {
  it('should return 400 when creating zone without name', async () => {
    const res = await request(app)
      .post('/zones')
      .send({ description: 'Test Description' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when creating zone without description', async () => {
    const res = await request(app)
      .post('/zones')
      .send({ name: 'Test Zone' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when getting zone with invalid id', async () => {
    const res = await request(app).get('/zones/invalid');
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when updating zone with invalid id', async () => {
    const res = await request(app)
      .put('/zones/invalid')
      .send({ name: 'Updated Zone', description: 'Updated Description' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when deleting zone with invalid id', async () => {
    const res = await request(app).delete('/zones/invalid');
    expect(res.statusCode).toBe(400);
  });

  it('should return 404 when getting non-existent zone', async () => {
    const res = await request(app).get('/zones/99999');
    expect(res.statusCode).toBe(404);
  });
});
