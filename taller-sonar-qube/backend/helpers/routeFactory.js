const express = require('express');
const CrudHelper = require('./crudHelper');
const Validator = require('./validator');

/**
 * Factory para crear rutas CRUD genéricas
 * Elimina completamente la duplicación de código entre rutas
 */
function createCrudRoutes(config) {
  const router = express.Router();
  const { tableName, searchField, requiredFields, transformData } = config;
  const crudHelper = new CrudHelper(tableName);

  // GET all - Lista todos los registros con búsqueda opcional
  router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const result = await crudHelper.getAll(searchField, search);
    
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message });
    }
    res.json(result.data);
  });

  // GET by ID - Obtiene un registro por ID
  router.get('/:id', async (req, res) => {
    const validation = Validator.validateId(req.params.id);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await crudHelper.getById(validation.value);
    if (!result.success) {
      return res.status(result.status || 500).json({ success: false, message: result.message });
    }
    res.json(result.data);
  });

  // POST - Crea un nuevo registro
  router.post('/', async (req, res) => {
    const validation = Validator.validateRequired(requiredFields, req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const { fields, values, error } = transformData ? transformData(req.body) : 
      { fields: requiredFields, values: requiredFields.map(f => Validator.sanitizeString(req.body[f])) };
    
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const result = await crudHelper.create(fields, values);
    
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message });
    }
    res.status(result.status).json({ success: true, message: result.message });
  });

  // PUT - Actualiza un registro existente
  router.put('/:id', async (req, res) => {
    const idValidation = Validator.validateId(req.params.id);
    if (!idValidation.valid) {
      return res.status(400).json({ success: false, message: idValidation.message });
    }

    const validation = Validator.validateRequired(requiredFields, req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const { fields, values, error } = transformData ? transformData(req.body) : 
      { fields: requiredFields, values: requiredFields.map(f => Validator.sanitizeString(req.body[f])) };
    
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const result = await crudHelper.update(idValidation.value, fields, values);
    
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message });
    }
    res.json({ success: true, message: result.message });
  });

  // DELETE - Elimina un registro
  router.delete('/:id', async (req, res) => {
    const validation = Validator.validateId(req.params.id);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const result = await crudHelper.delete(validation.value);
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message });
    }
    res.json({ success: true, message: result.message });
  });

  return router;
}

module.exports = createCrudRoutes;
