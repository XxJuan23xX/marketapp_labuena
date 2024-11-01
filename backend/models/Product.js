// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // Almacena URLs de las imágenes
    type: { type: String, enum: ['venta', 'subasta'], required: true },
    price: { type: Number },
    startingPrice: { type: Number },
    auctionEndTime: { type: Date },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
