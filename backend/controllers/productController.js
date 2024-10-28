// controllers/productController.js

const upload = require('../uploads/multerConfig'); // Importa configuración de Multer para imágenes

const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

exports.createProduct = [
    upload.array('images', 5),

    async (req, res) => {
        try {
            const { name, description, category, type, price, discount, startingPrice, auctionEndTime } = req.body;
            const images = req.files.map(file => file.path);

            const userId = req.user.id;

            const newProduct = new Product({
                name,
                description,
                category,
                type,
                images,
                price: type === 'venta' ? price : undefined,
                discount: type === 'venta' ? discount : undefined,
                startingPrice: type === 'subasta' ? startingPrice : undefined,
                auctionEndTime: type === 'subasta' ? auctionEndTime : undefined,
                seller_id: userId,
            });

            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: 'Error creando el producto: ' + error.message });
        }
    }
];

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller_id', 'name email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los productos: ' + error.message });
    }
};

// En tu productController.js

exports.getProductsByUser = async (req, res) => {
    try {
      const userId = req.user.id; // Esto debería obtener el `userId` del token
      console.log("User ID:", userId); // Verifica el userId
      const products = await Product.find({ seller_id: userId }).populate('seller_id', 'name email');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo los productos del usuario: ' + error.message });
    }
  };

  // Función para actualizar solo el estado (isActive) del producto
  exports.updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
  
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { isActive },
        { new: true } // Retorna el documento actualizado
      );
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Estado del producto actualizado', product });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del producto', error });
    }
  };
  

