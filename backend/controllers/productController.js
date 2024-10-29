// controllers/productController.js

const upload = require('../uploads/multerConfig'); // Importa configuración de Multer para imágenes

const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

exports.createProduct = [
    upload.array('images', 5),

    async (req, res) => {
        try {
            const { name, description, category, type, price, stock, startingPrice, auctionEndTime } = req.body;
            const images = req.files.map(file => file.path);

            const userId = req.user.id;

            const newProduct = new Product({
                name,
                description,
                category,
                type,
                images,
                price: type === 'venta' ? price : undefined,
                stock: type === 'venta' ? stock : undefined, // Agregar el campo stock
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
        console.log("Productos con seller_id:", products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los productos: ' + error.message });
    }
};

// En tu productController.js

exports.getProductsByUser = async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const userId = req.user.id;
      console.log("User ID:", userId); // Verifica el userId

      // Verificar que `Product` esté correctamente definido
      if (!Product) {
        console.error("El modelo Product no está definido.");
        return res.status(500).json({ error: "Error en el servidor: modelo no encontrado." });
      }

      const products = await Product.find({ seller_id: userId }).populate('seller_id', 'name email');
      
      if (!products) {
        return res.status(404).json({ error: "No se encontraron productos para este usuario." });
      }
      
      res.status(200).json(products);
    } catch (error) {
      console.error("Error en getProductsByUser:", error.message);
      res.status(500).json({ error: 'Error obteniendo los productos del usuario: ' + error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;  
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
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
  

