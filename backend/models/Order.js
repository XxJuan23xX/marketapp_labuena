const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencia al producto comprado
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al comprador
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al vendedor
        required: true
    },
    price: {
        type: Number, // Precio final de la compra
        required: true
    },
    shipping_address: {
        type: String, // Dirección de envío
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'enviado', 'entregado', 'completado'],
        default: 'pendiente'
    },
    confirmation: {
        shipped: {
            type: Boolean,
            default: false // Confirmación de envío por el vendedor
        },
        delivered: {
            type: Boolean,
            default: false // Confirmación de entrega por el comprador
        },
        reviewed: {
            type: Boolean,
            default: false // Confirmación de reseña del comprador
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
