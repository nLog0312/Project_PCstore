const warrantyController = require('../controllers/warrantyController');

const routes = require('express').Router();

// Add warranty here
routes.post('/', warrantyController.addWarranty);

// Get all warranties here
routes.get('/', warrantyController.getAllWarranties);

// Get warranty by id here
routes.get('/:id', warrantyController.getWarrantyById);

module.exports = routes;