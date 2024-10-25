const Product = require('../models/Product');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { seller_id, title, description, price, isAuction, auction_end_time, category, images } = req.body;
        const newProduct = new Product({ seller_id, title, description, price, isAuction, auction_end_time, category, images });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error creando el producto: ' + error.message });
    }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller_id', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los productos: ' + error.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller_id', 'name email');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo el producto: ' + error.message });
    }
};

// Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error actualizando el producto: ' + error.message });
    }
};

// Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando el producto: ' + error.message });
    }
};
