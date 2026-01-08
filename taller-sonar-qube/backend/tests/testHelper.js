/**
 * Helper para crear tests de CRUD reutilizables
 */
const request = require('supertest');

function createCrudTests(config) {
  const { app, endpoint, entityName, sampleData, updateData } = config;

  return () => {
    describe(`GET ${endpoint}`, () => {
      it(`should return all ${entityName}`, async () => {
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });

      it(`should search ${entityName}`, async () => {
        const searchParam = Object.keys(sampleData)[0];
        const res = await request(app).get(`${endpoint}?search=test`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
      });
    });

    describe(`POST ${endpoint}`, () => {
      it(`should create a new ${entityName}`, async () => {
        const res = await request(app)
          .post(endpoint)
          .send(sampleData);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
      });

      it('should fail without required fields', async () => {
        const incompleteData = { ...sampleData };
        delete incompleteData[Object.keys(sampleData)[0]];
        
        const res = await request(app)
          .post(endpoint)
          .send(incompleteData);
        expect(res.statusCode).toBe(400);
      });
    });

    describe(`GET ${endpoint}/:id`, () => {
      it(`should return a ${entityName} by id or 404`, async () => {
        const res = await request(app).get(`${endpoint}/1`);
        expect([200, 404]).toContain(res.statusCode);
        if (res.statusCode === 200) {
          expect(res.body).toHaveProperty('id');
        }
      });

      it('should return 400 for invalid id', async () => {
        const res = await request(app).get(`${endpoint}/abc`);
        expect(res.statusCode).toBe(400);
      });
    });

    describe(`PUT ${endpoint}/:id`, () => {
      it(`should update a ${entityName}`, async () => {
        const res = await request(app)
          .put(`${endpoint}/1`)
          .send(updateData || sampleData);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
      });
    });

    describe(`DELETE ${endpoint}/:id`, () => {
      it(`should delete a ${entityName}`, async () => {
        const res = await request(app).delete(`${endpoint}/1`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
      });
    });
  };
}

module.exports = createCrudTests;
