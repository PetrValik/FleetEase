const express = require('express');
const router = express.Router();
const vehicleBrandController = require('../../controllers/vehicles/vehicleBrandController');
const validate = require('../../middlewares/validate');
const vehicleBrandSchema = require('../../validationSchemas/vehicles/vehicleBrandSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all vehicle brands
router.get('/', authenticateToken, checkRole(['admin', 'manager']), logAudit, vehicleBrandController.getAll);

// Get one vehicle brand by ID
router.get('/:id', authenticateToken, checkRole(['admin', 'manager']), logAudit, vehicleBrandController.getById);

// Create a new vehicle brand
router.post('/', authenticateToken, checkRole(['admin']), validate(vehicleBrandSchema), logAudit, vehicleBrandController.create);

// Update a vehicle brand
router.put('/:id', authenticateToken, checkRole(['admin']), validate(vehicleBrandSchema), logAudit, vehicleBrandController.update);

// Delete a vehicle brand
router.delete('/:id', authenticateToken, checkRole(['admin']), logAudit, vehicleBrandController.delete);

module.exports = router;
