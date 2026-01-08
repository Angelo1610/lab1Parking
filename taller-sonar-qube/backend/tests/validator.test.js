const Validator = require('../helpers/validator');

describe('Validator', () => {
  describe('validateId', () => {
    it('should validate a valid id', () => {
      const result = Validator.validateId('123');
      expect(result.valid).toBe(true);
      expect(result.value).toBe(123);
    });

    it('should reject non-numeric id', () => {
      const result = Validator.validateId('abc');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Invalid ID');
    });

    it('should reject negative id', () => {
      const result = Validator.validateId('-5');
      expect(result.valid).toBe(false);
    });

    it('should reject zero id', () => {
      const result = Validator.validateId('0');
      expect(result.valid).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should validate when all fields are present', () => {
      const result = Validator.validateRequired(['name', 'email'], {
        name: 'John',
        email: 'john@example.com'
      });
      expect(result.valid).toBe(true);
    });

    it('should reject when a field is missing', () => {
      const result = Validator.validateRequired(['name', 'email'], {
        name: 'John'
      });
      expect(result.valid).toBe(false);
      expect(result.message).toContain('email');
    });

    it('should reject when a field is empty', () => {
      const result = Validator.validateRequired(['name'], {
        name: '   '
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('should trim whitespace', () => {
      const result = Validator.sanitizeString('  test  ');
      expect(result).toBe('test');
    });

    it('should return non-string values unchanged', () => {
      expect(Validator.sanitizeString(123)).toBe(123);
      expect(Validator.sanitizeString(null)).toBe(null);
    });
  });
});
