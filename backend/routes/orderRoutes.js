const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Crear orden
router.post('/', orderController.createOrder);

// Obtener todas las órdenes
router.get('/', orderController.getOrders);
router.get('/last-sold-products', orderController.getLastSoldProducts);
router.get('/monthly-sales', orderController.getMonthlySales);



// Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// Actualizar el estado de una orden por ID
router.put('/:id', orderController.updateOrderStatus);

// Eliminar una orden por ID
router.delete('/:id', orderController.deleteOrder);

// Obtener el total de productos vendidos
router.get('/productos-vendidos', orderController.getProductosVendidos);


module.exports = router;
