const CrudHelper = require('../helpers/crudHelper');
const db = require('../config/db');

jest.mock('../config/db');

describe('CrudHelper', () => {
  let crudHelper;

  beforeEach(() => {
    crudHelper = new CrudHelper('test_table');
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should handle database errors gracefully', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      
      const result = await crudHelper.getAll('name', 'test');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error fetching test_table');
    });

    it('should return data successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'test' }] });
      
      const result = await crudHelper.getAll('name', 'test');
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual([{ id: 1, name: 'test' }]);
    });
  });

  describe('getById', () => {
    it('should return 404 when record not found', async () => {
      db.query.mockResolvedValue({ rows: [] });
      
      const result = await crudHelper.getById(999);
      
      expect(result.success).toBe(false);
      expect(result.status).toBe(404);
    });

    it('should handle database errors', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      
      const result = await crudHelper.getById(1);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error fetching test_table');
    });

    it('should return data when found', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'test' }] });
      
      const result = await crudHelper.getById(1);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ id: 1, name: 'test' });
    });
  });

  describe('create', () => {
    it('should handle database errors', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      
      const result = await crudHelper.create(['name'], ['test']);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error creating test_table');
    });

    it('should create record successfully', async () => {
      db.query.mockResolvedValue({});
      
      const result = await crudHelper.create(['name'], ['test']);
      
      expect(result.success).toBe(true);
      expect(result.status).toBe(201);
    });
  });

  describe('update', () => {
    it('should handle database errors', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      
      const result = await crudHelper.update(1, ['name'], ['test']);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error updating test_table');
    });

    it('should update record successfully', async () => {
      db.query.mockResolvedValue({});
      
      const result = await crudHelper.update(1, ['name'], ['test']);
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('test_table updated');
    });
  });

  describe('delete', () => {
    it('should handle database errors', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      
      const result = await crudHelper.delete(1);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Error deleting test_table');
    });

    it('should delete record successfully', async () => {
      db.query.mockResolvedValue({});
      
      const result = await crudHelper.delete(1);
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('test_table deleted');
    });
  });
});
