// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // Guardará rutas de las imágenes
    type: { type: String, enum: ['venta', 'subasta'], required: true }, // Indica si es venta o subasta
    price: { type: Number }, // Precio para venta
    discount: { type: Number, default: 0 }, // Descuento para ventas (opcional)
    startingPrice: { type: Number }, // Precio inicial para subasta
    auctionEndTime: { type: Date }, // Fecha de fin de subasta
    isActive: { type: Boolean, default: true }, // Indica si la subasta está activa
    bids: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            bidAmount: Number,
            bidTime: { type: Date, default: Date.now }
        }
    ],
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
