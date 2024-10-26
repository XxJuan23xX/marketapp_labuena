require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const messageRoutes = require('./routes/messageRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes'); 
const wishlistRoutes = require('./routes/wishlistRoutes'); 
const notificationRoutes = require('./routes/notificationRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por el origen de tu frontend
    credentials: true,
}));

// Middleware para leer JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Servir archivos estáticos desde la carpeta `uploads`
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas para cada recurso
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/notifications', notificationRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
