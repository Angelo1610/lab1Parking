const createCrudRoutes = require('../helpers/routeFactory');
const Validator = require('../helpers/validator');

// Configuración específica para spaces con transformación de datos
module.exports = createCrudRoutes({
  tableName: 'spaces',
  searchField: 'number',
  requiredFields: ['zone_id', 'number', 'status'],
  transformData: (body) => {
    const { zone_id, number, status } = body;
    
    const zoneIdValidation = Validator.validateId(zone_id);
    if (!zoneIdValidation.valid) {
      return { error: 'Invalid zone ID' };
    }
    
    return {
      fields: ['zone_id', 'number', 'status'],
      values: [zoneIdValidation.value, Validator.sanitizeString(number), Validator.sanitizeString(status)]
    };
  }
});