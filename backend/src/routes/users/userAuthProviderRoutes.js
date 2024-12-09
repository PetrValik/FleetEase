const express = require('express');
const router = express.Router();
const userAuthProviderController = require('../../controllers/users/userAuthProviderController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware pro JWT ověření

// Endpointy pro userAuthProviders (přístup pouze pro přihlášené uživatele)
router.get('/', authenticateToken, userAuthProviderController.getAllUserAuthProviders);
router.get('/:id', authenticateToken, userAuthProviderController.getUserAuthProviderById);
router.post('/', authenticateToken, userAuthProviderController.createUserAuthProvider);

module.exports = router;
