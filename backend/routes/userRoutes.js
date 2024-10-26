const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.put('/:id/avatar', userController.updateAvatar); // Nueva ruta para actualizar avatar
router.delete('/:id', userController.deleteUser);
// Ruta para obtener el avatar del usuario actual
router.get('/:id/avatar', userController.getAvatar);


module.exports = router;
