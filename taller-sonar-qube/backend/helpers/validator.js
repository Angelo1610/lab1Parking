/**
 * Input validation helper
 */
class Validator {
  static validateId(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      return { valid: false, message: 'Invalid ID' };
    }
    return { valid: true, value: parsedId };
  }

  static validateRequired(fields, data) {
    for (const field of fields) {
      if (!data[field] || data[field].toString().trim() === '') {
        return { valid: false, message: `${field} is required` };
      }
    }
    return { valid: true };
  }

  static sanitizeString(value) {
    if (typeof value !== 'string') return value;
    return value.trim();
  }
}

module.exports = Validator;
