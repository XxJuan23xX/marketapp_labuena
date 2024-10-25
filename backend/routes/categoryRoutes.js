const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

// Obtener todas las categorías
router.get('/', categoryController.getCategories);

// Obtener una categoría por ID
router.get('/:id', categoryController.getCategoryById);

// Actualizar una categoría por ID
router.put('/:id', categoryController.updateCategory);

// Eliminar una categoría por ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
