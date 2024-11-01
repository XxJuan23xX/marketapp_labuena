const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los productos
router.get('/', productController.getProducts); // Ruta para obtener todos los productos

// Crear un nuevo producto (requiere autenticación)
router.post('/create', authMiddleware, productController.createProduct);

// Obtener productos por usuario (requiere autenticación)
router.get('/user-products', authMiddleware, productController.getProductsByUser);

// Actualizar el estado del producto (requiere autenticación)
router.patch('/:id/status', authMiddleware, productController.updateProductStatus);

// Obtener producto por ID
router.get('/:productId', productController.getProductById);

module.exports = router;
