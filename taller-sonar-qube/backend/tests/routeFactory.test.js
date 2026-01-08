const createCrudRoutes = require('../helpers/routeFactory');

describe('RouteFactory', () => {
  it('should create routes correctly', () => {
    const routes = createCrudRoutes({
      tableName: 'test',
      searchField: 'name',
      requiredFields: ['name']
    });
    
    expect(routes).toBeDefined();
    expect(typeof routes).toBe('function');
  });
});
