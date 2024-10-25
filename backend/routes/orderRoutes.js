const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Crear orden
router.post('/', orderController.createOrder);

// Obtener todas las órdenes
router.get('/', orderController.getOrders);

// Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// Actualizar el estado de una orden por ID
router.put('/:id', orderController.updateOrderStatus);

// Eliminar una orden por ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
