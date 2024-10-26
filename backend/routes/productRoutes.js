// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Crear producto
router.post('/', productController.createProduct);

// Obtener todos los productos, con opción de filtrar por tipo
router.get('/', productController.getProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/:id', productController.updateProduct);

module.exports = router;
