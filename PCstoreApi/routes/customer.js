const customerController = require('../controllers/customerController');

const routes = require('express').Router();

// Add customer here
routes.post('/', customerController.addCustomer);

// Get all customers here
routes.get('/', customerController.getAllCustomers);

// Get customer by id here
routes.get('/:id', customerController.getCustomerById);

// Delete customer by id here
routes.delete('/:id', customerController.deleteCustomerById);

// Update customer by id here
routes.put('/:id', customerController.updateCustomerById);

module.exports = routes;