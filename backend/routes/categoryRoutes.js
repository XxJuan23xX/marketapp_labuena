// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Ruta para crear una nueva categoría
router.post('/categories', categoryController.createCategory);

// Ruta para obtener todas las categorías
router.get('/categories', categoryController.getCategories);

module.exports = router;
