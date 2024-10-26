// controllers/auctionController.js
const Auction = require('../models/Auction');
const upload = require('../uploads/multerConfig'); // Cambia esto a la ruta correcta de tu configuración de Multer

// Crear una subasta con subida de imágenes
exports.createAuction = [
    upload.array('images', 5), // Permitir hasta 5 imágenes
    async (req, res) => {
        try {
            const { product_id, seller_id, startingPrice, auctionEndTime } = req.body;
            const images = req.files.map(file => file.path); // Guardar las rutas de las imágenes

            const newAuction = new Auction({
                product_id,
                seller_id,
                startingPrice,
                auctionEndTime,
                images // Guardar las rutas de las imágenes en la base de datos
            });

            await newAuction.save();
            res.status(201).json(newAuction);
        } catch (error) {
            res.status(400).json({ error: 'Error creando la subasta: ' + error.message });
        }
    }
];

// Obtener todas las subastas
exports.getAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find()
            .populate('product_id')
            .populate('seller_id', 'name email');
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las subastas: ' + error.message });
    }
};

// Obtener una subasta por ID
exports.getAuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id)
            .populate('product_id')
            .populate('seller_id', 'name email');
        if (!auction) return res.status(404).json({ message: 'Subasta no encontrada' });
        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la subasta: ' + error.message });
    }
};
