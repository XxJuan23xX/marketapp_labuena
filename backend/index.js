require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar CORS
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuarios
const app = express();
const PORT = process.env.PORT || 5000;
const productRoutes = require('./routes/productRoutes');




app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por el origen de tu frontend
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  }));

// Middleware para leer JSON
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas para usuarios

app.use('/api/users', userRoutes);

app.use('/api/users/login', userRoutes);

//Ruta solo paa recibir inormaion para el home 
app.use('/api/products', productRoutes);
// Rutas para ventas


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
