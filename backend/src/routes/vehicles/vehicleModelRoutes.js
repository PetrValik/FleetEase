const express = require('express');
const router = express.Router();
const vehicleModelController = require('../../controllers/vehicles/vehicleModelController');
const validate = require('../../middlewares/validate');
const vehicleModelSchema = require('../../validationSchemas/vehicles/vehicleModelSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all vehicle models
router.get('/', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, vehicleModelController.getAll);

// Get one vehicle model by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, vehicleModelController.getById);

// Create a new vehicle model
router.post('/', authenticateToken, checkRole(['Admin']), validate(vehicleModelSchema), logAudit, vehicleModelController.create);

// Update a vehicle model
router.put('/:id', authenticateToken, checkRole(['Admin']), validate(vehicleModelSchema), logAudit, vehicleModelController.update);

// Delete a vehicle model
router.delete('/:id', authenticateToken, checkRole(['Admin']), logAudit, vehicleModelController.delete);

module.exports = router;
