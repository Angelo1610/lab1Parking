const createCrudRoutes = require('../helpers/routeFactory');

// Configuración específica para zones
module.exports = createCrudRoutes({
  tableName: 'zones',
  searchField: 'name',
  requiredFields: ['name', 'description']
});