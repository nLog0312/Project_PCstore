const productController = require('../controllers/productController');

const routes = require('express').Router();

// Add product here
routes.post('/', productController.addProduct);

// Get all products here
routes.get('/', productController.getAllProducts);

// Get product by id here
routes.get('/:id', productController.getProductById);

// Delete product by id here
routes.delete('/:id', productController.deleteProductById);

// Update product by id here
routes.put('/:id', productController.updateProductById);

// Update quantity by id here
routes.patch('/:id', productController.updateQuantityById);

module.exports = routes;