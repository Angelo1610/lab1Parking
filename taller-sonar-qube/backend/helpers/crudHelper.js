const db = require('../config/db');
const logger = require('../utils/logger');

/**
 * Generic CRUD helper to reduce code duplication
 */
class CrudHelper {
  constructor(tableName, allowedColumns = []) {
    this.tableName = tableName;
    this.allowedColumns = allowedColumns;
  }

  async getAll(searchField, searchValue) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE ${searchField} LIKE $1`;
      const result = await db.query(query, [`%${searchValue}%`]);
      return { success: true, data: result.rows };
    } catch (err) {
      logger.error(`Error in getAll for ${this.tableName}:`, err);
      return { success: false, message: `Error fetching ${this.tableName}` };
    }
  }

  async getById(id) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
      const result = await db.query(query, [id]);
      if (result.rows.length === 0) {
        return { success: false, message: `${this.tableName} not found`, status: 404 };
      }
      return { success: true, data: result.rows[0] };
    } catch (err) {
      logger.error(`Error in getById for ${this.tableName}:`, err);
      return { success: false, message: `Error fetching ${this.tableName}` };
    }
  }

  async create(fields, values) {
    try {
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
      const query = `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`;
      await db.query(query, values);
      return { success: true, message: `${this.tableName} created`, status: 201 };
    } catch (err) {
      logger.error(`Error in create for ${this.tableName}:`, err);
      return { success: false, message: `Error creating ${this.tableName}` };
    }
  }

  async update(id, fields, values) {
    try {
      const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
      const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${fields.length + 1}`;
      await db.query(query, [...values, id]);
      return { success: true, message: `${this.tableName} updated` };
    } catch (err) {
      logger.error(`Error in update for ${this.tableName}:`, err);
      return { success: false, message: `Error updating ${this.tableName}` };
    }
  }

  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
      await db.query(query, [id]);
      return { success: true, message: `${this.tableName} deleted` };
    } catch (err) {
      logger.error(`Error in delete for ${this.tableName}:`, err);
      return { success: false, message: `Error deleting ${this.tableName}` };
    }
  }
}

module.exports = CrudHelper;
