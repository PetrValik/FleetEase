const express = require('express');
const router = express.Router();
const authProviderController = require('../../controllers/users/authProviderController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware pro JWT ověření

// Endpointy pro poskytovatele autentizace (přístup pouze pro přihlášené uživatele)
router.get('/', authenticateToken, authProviderController.getAllAuthProviders);
router.get('/:id', authenticateToken, authProviderController.getAuthProvider);

module.exports = router;
