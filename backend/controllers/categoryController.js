const Category = require('../models/Category');

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: 'Error creando la categoría: ' + error.message });
    }
};

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo las categorías: ' + error.message });
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la categoría: ' + error.message });
    }
};

// Actualizar una categoría por ID
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Error actualizando la categoría: ' + error.message });
    }
};

// Eliminar una categoría por ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando la categoría: ' + error.message });
    }
};
