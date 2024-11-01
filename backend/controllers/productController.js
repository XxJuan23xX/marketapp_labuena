const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Product = require('../models/Product'); // Ajusta la ruta según la estructura de tu proyecto


// Configuración de Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Configuración de multer con Google Cloud Storage
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar tamaño a 5MB
});

async function uploadImageToGCS(file) {
  const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
  console.log("Nombre del bucket:", bucketName);
const bucket = storage.bucket(bucketName);


  const blob = bucket.file(`products/${Date.now()}_${path.basename(file.originalname)}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype, // Establece el tipo de contenido correcto
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      console.error('Error subiendo a GCS:', err);
      reject(err);
    });

    blobStream.on('finish', () => {
      // La URL pública del archivo
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
}


// Crear producto con imágenes en Google Cloud Storage
exports.createProduct = [
    upload.array('images', 5), // Permite hasta 5 imágenes
    async (req, res) => {
        console.log("Datos recibidos en el cuerpo (req.body):", req.body);
        console.log("Archivos recibidos (req.files):", req.files);

        try {
            const { name, description, category, type, price, stock, startingPrice, auctionEndTime } = req.body;

            // Si los datos obligatorios no están presentes, devuelve un error.
            if (!name || !description || !category || !type) {
                return res.status(400).json({ error: 'Faltan datos obligatorios' });
            }

            const images = await Promise.all(req.files.map(file => uploadImageToGCS(file)));

            const userId = req.user.id;

            const newProduct = new Product({
                name,
                description,
                category,
                type,
                images,
                price: type === 'venta' ? price : undefined,
                stock: type === 'venta' ? stock : undefined,
                startingPrice: type === 'subasta' ? startingPrice : undefined,
                auctionEndTime: type === 'subasta' ? auctionEndTime : undefined,
                seller_id: userId,
            });

            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error en la creación del producto:", error);
            res.status(400).json({ error: 'Error creando el producto: ' + error.message });
        }
    }
];





// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller_id', 'name email');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener los productos:", error.message);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener productos por usuario
exports.getProductsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProducts = await Product.find({ seller_id: userId });
        
        res.status(200).json(userProducts);
    } catch (error) {
        console.error("Error al obtener los productos del usuario:", error.message);
        res.status(500).json({ error: 'Error al obtener los productos del usuario' });
    }
};

// Actualizar el estado del producto (activo/desactivado)
exports.updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: isActive },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Estado del producto actualizado', product });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error.message);
        res.status(500).json({ message: 'Error al actualizar el estado del producto', error });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate('seller_id', 'name email');

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error.message);
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};
