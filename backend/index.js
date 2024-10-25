require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para leer JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas para usuarios
const userRoutes = require('./Routes/userRoutes');
app.use('/api/users', userRoutes);

// Rutas para productos
const productRoutes = require('./Routes/productRoutes');
app.use('/api/products', productRoutes);

// Rutas para órdenes
const orderRoutes = require('./Routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Rutas para mensajes
const messageRoutes = require('./Routes/messageRoutes');
app.use('/api/messages', messageRoutes);

// Rutas para categorías
const categoryRoutes = require('./Routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

// Rutas para reseñas
const reviewRoutes = require('./Routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

// Rutas para pagos
const paymentRoutes = require('./Routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

// Rutas para listas de deseos
const wishlistRoutes = require('./Routes/wishlistRoutes');
app.use('/api/wishlists', wishlistRoutes);

// Rutas para notificaciones
const notificationRoutes = require('./Routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
