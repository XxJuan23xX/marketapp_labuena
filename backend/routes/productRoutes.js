const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear producto
router.post('/', productController.createProduct);

// Obtener todos los productos
router.get('/', productController.getProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/:id', productController.updateProduct);

// Eliminar un producto por ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
