// controllers/categoryController.js
const Category = require('../models/Category');

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(400).json({ message: 'No se pudo crear la categoría.' });
  }
};

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías.' });
  }
};
