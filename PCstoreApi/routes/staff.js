const staffController = require('../controllers/staffController');

const routes = require('express').Router();

// Add staff here
routes.post('/', staffController.addStaff);

// Get all staff here
routes.get('/', staffController.getAllStaff);

// Get staff by id here
routes.get('/:id', staffController.getStaffById);

// Delete staff by id here
routes.delete('/:id', staffController.deleteStaffById);

// Update staff by id here
routes.put('/:id', staffController.updateStaffById);

module.exports = routes;