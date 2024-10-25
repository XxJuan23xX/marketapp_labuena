const Order = require('../models/Order');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const { product_id, buyer_id, seller_id, price, shipping_address } = req.body;
        const newOrder = new Order({ product_id, buyer_id, seller_id, price, shipping_address });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: 'Error creando la orden: ' + error.message });
    }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('product_id', 'title')
            .populate('buyer_id', 'name email')
            .populate('seller_id', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las órdenes: ' + error.message });
    }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('product_id', 'title')
            .populate('buyer_id', 'name email')
            .populate('seller_id', 'name email');
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la orden: ' + error.message });
    }
};

// Actualizar el estado de una orden (envío, entrega, etc.)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, confirmation } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status, confirmation }, { new: true });
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Error actualizando la orden: ' + error.message });
    }
};

// Eliminar una orden por ID
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la orden: ' + error.message });
    }
};
