const Order = require('../models/Order');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const { product_id, buyer_id, seller_id, price } = req.body;
        const newOrder = new Order({ product_id, buyer_id, seller_id, price });
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

// Obtener las ganancias totales y el cambio porcentual en el último mes
exports.getGanancias = async (req, res) => {
    try {
        const fechaActual = new Date();
        const primerDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const primerDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1);
        const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);

        // Obtener las órdenes completadas del mes actual y del mes anterior
        const ordenesMesActual = await Order.find({
            status: 'completado',
            created_at: { $gte: primerDiaMesActual }
        });

        const ordenesMesAnterior = await Order.find({
            status: 'completado',
            created_at: { $gte: primerDiaMesAnterior, $lte: ultimoDiaMesAnterior }
        });

        // Calcular las ganancias del mes actual y del mes anterior
        const gananciasMesActual = ordenesMesActual.reduce((total, order) => total + order.price, 0);
        const gananciasMesAnterior = ordenesMesAnterior.reduce((total, order) => total + order.price, 0);

        // Calcular el cambio porcentual
        let cambioPorcentual = 0;
        if (gananciasMesAnterior > 0) {
            cambioPorcentual = ((gananciasMesActual - gananciasMesAnterior) / gananciasMesAnterior) * 100;
        }

        res.status(200).json({
            total: gananciasMesActual || 0,  // Devuelve 0 si no hay ganancias
            cambioPorcentual: parseFloat(cambioPorcentual.toFixed(2)) || 0  // Devuelve 0 si no hay cambio
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ganancias: ' + error.message });
    }
};

// Obtener el número total de productos vendidos
exports.getProductosVendidos = async (req, res) => {
    try {
        // Contamos todas las órdenes cuyo estado sea 'completado'
        const totalProductosVendidos = await Order.countDocuments({ status: 'completado' });
        res.status(200).json({ total: totalProductosVendidos });
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los productos vendidos: ' + error.message });
    }
};

// Obtener los últimos 3 productos vendidos
exports.getLastSoldProducts = async (req, res) => {
    try {
        const lastSoldProducts = await Order.find({ status: 'completado' }) // Solo pedidos completados
            .sort({ created_at: -1 })
            .limit(3)
            .populate('product_id', 'title'); // Obteniendo el título del producto

        res.status(200).json(lastSoldProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los últimos productos vendidos: ' + error.message });
    }
};

// Obtener las ventas mensuales
exports.getMonthlySales = async (req, res) => {
    try {
      const sales = await Order.aggregate([
        {
          $match: { status: 'completado' } // Solo pedidos completados
        },
        {
          $group: {
            _id: { $month: '$created_at' },
            totalSales: { $sum: '$price' }
          }
        },
        {
          $sort: { _id: 1 } // Ordenar por mes
        }
      ]);
  
      const formattedSales = sales.map(sale => ({
        month: sale._id,
        totalSales: sale.totalSales
      }));
  
      res.status(200).json(formattedSales);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las ventas mensuales: ' + error.message });
    }
  };
  

