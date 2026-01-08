const db = require('../config/db');

afterAll(async () => {
  // Cerrar la conexión a la base de datos después de todas las pruebas
  await new Promise(resolve => setTimeout(resolve, 500));
});
