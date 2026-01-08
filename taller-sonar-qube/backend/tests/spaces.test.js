const app = require('../server');
const request = require('supertest');
const createCrudTests = require('./testHelper');

describe('Spaces API', createCrudTests({
  app,
  endpoint: '/spaces',
  entityName: 'spaces',
  sampleData: { 
    zone_id: 1, 
    number: 'TEST1', 
    status: 'Disponible' 
  },
  updateData: { 
    zone_id: 1, 
    number: 'A1', 
    status: 'Ocupado' 
  }
}));

describe('Spaces API - Additional Tests', () => {
  it('should return 400 when creating space without zone_id', async () => {
    const res = await request(app)
      .post('/spaces')
      .send({ number: 'TEST1', status: 'Disponible' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when creating space without number', async () => {
    const res = await request(app)
      .post('/spaces')
      .send({ zone_id: 1, status: 'Disponible' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when creating space without status', async () => {
    const res = await request(app)
      .post('/spaces')
      .send({ zone_id: 1, number: 'TEST1' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when updating with invalid zone_id', async () => {
    const res = await request(app)
      .put('/spaces/1')
      .send({ zone_id: 'invalid', number: 'A1', status: 'Ocupado' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when getting space with invalid id', async () => {
    const res = await request(app).get('/spaces/invalid');
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when updating space with invalid id', async () => {
    const res = await request(app)
      .put('/spaces/invalid')
      .send({ zone_id: 1, number: 'A1', status: 'Ocupado' });
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when deleting space with invalid id', async () => {
    const res = await request(app).delete('/spaces/invalid');
    expect(res.statusCode).toBe(400);
  });
});
