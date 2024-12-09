const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const validate = require('../../middlewares/validate');
const registerValidator = require('../../models/users/register');
const loginValidator = require('../../models/users/login');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware pro ověření přihlášení

// Registrace uživatele
router.post('/register', validate(registerValidator), userController.register);

// Přihlášení uživatele
router.post('/login', validate(loginValidator), userController.login);

// Získání všech uživatelů (přístup omezen pouze na přihlášené uživatele)
router.get('/', authenticateToken, userController.getAllUsers);

// Získání jednoho uživatele podle ID (přístup omezen pouze na přihlášené uživatele)
router.get('/:id', authenticateToken, userController.getUserById);

// Ověření existence e-mailu
router.get('/email/:email', userController.checkEmailExists);

module.exports = router;
