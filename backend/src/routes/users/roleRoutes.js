const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/users/roleController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware pro JWT ověření

// Endpointy pro role (přístup pouze pro přihlášené uživatele)
router.get('/', authenticateToken, roleController.getAllRoles);
router.get('/:id', authenticateToken, roleController.getRoleById);

module.exports = router;
