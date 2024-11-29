const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { getProductosPopulares } = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getProducts); // Ruta para obtener todos los productos

// Ruta para obtener productos populares
router.get('/productos-populares', getProductosPopulares);

// Crear un nuevo producto (requiere autenticación)
router.post('/create', authMiddleware, productController.createProduct);

// Obtener productos por usuario (requiere autenticación)
router.get('/user-products', authMiddleware, productController.getProductsByUser);

// Actualizar el estado del producto (requiere autenticación)
router.patch('/:id/status', authMiddleware, productController.updateProductStatus);

// Ruta para obtener las ofertas del día
router.get('/daily-deals', productController.getDailyDeals);

router.get('/daily-auctions', productController.getDailyAuctions);

// Ruta en el backend
router.get('/recommendations', productController.getRecommendedProducts);

// Obtener producto por ID
router.get('/:productId', productController.getProductById);




module.exports = router;
