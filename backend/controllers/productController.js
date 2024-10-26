// controllers/productController.js
const Product = require('../models/Product');
const upload = require('../uploads/multerConfig'); // Importa configuración de Multer para imágenes

// Crear un producto
exports.createProduct = [
    upload.array('images', 5), // Permite hasta 5 imágenes
    async (req, res) => {
        try {
            const { name, description, category, type, price, discount, startingPrice, auctionEndTime, seller_id } = req.body;
            const images = req.files.map(file => file.path);

            const newProduct = new Product({
                name,
                description,
                category,
                type,
                images,
                seller_id,
                price: type === 'venta' ? price : undefined,
                discount: type === 'venta' ? discount : undefined,
                startingPrice: type === 'subasta' ? startingPrice : undefined,
                auctionEndTime: type === 'subasta' ? auctionEndTime : undefined
            });

            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: 'Error creando el producto: ' + error.message });
        }
    }
];

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const { type } = req.query; // Filtra por tipo (venta o subasta) si se proporciona
        const query = type ? { type } : {};

        const products = await Product.find(query).populate('seller_id', 'name email');
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
        const { type, price, discount, startingPrice, auctionEndTime, ...rest } = req.body;
        const updateData = { ...rest };

        // Actualiza solo los campos específicos según el tipo de producto
        if (type === 'venta') {
            updateData.price = price;
            updateData.discount = discount;
        } else if (type === 'subasta') {
            updateData.startingPrice = startingPrice;
            updateData.auctionEndTime = auctionEndTime;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error actualizando el producto: ' + error.message });
    }
};
