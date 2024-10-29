const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/createproducts', authMiddleware, productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/user-products', authMiddleware, productController.getProductsByUser);
router.post('/products/create', authMiddleware, productController.createProduct);


router.get('/api/products/:productId', productController.getProductById);
router.get('/products/:id', productController.getProductById);




module.exports = router;
