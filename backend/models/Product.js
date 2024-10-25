const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al vendedor
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAuction: {
        type: Boolean,
        default: false // Por defecto, no es subasta
    },
    auction_end_time: {
        type: Date,
        required: function() {
            return this.isAuction;
        } // Solo requerido si es subasta
    },
    auction_bids: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amount: Number,
            bid_time: { type: Date, default: Date.now }
        }
    ],
    category: {
        type: String,
        required: true
    },
    images: [String], // URLs de imágenes
    sold: {
        type: Boolean,
        default: false
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
