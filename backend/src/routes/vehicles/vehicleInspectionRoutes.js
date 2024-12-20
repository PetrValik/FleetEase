const express = require('express');
const router = express.Router();
const vehicleInspectionController = require('../../controllers/vehicles/vehicleInspectionController');
const validate = require('../../middlewares/validate');
const vehicleInspectionSchema = require('../../validationSchemas/vehicles/vehicleInspectionSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const logAudit = require('../../middlewares/auditLogger');
const checkRole = require('../../middlewares/checkRole');

// Get all inspections
router.get('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, vehicleInspectionController.getAll);

// Get an inspection by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, vehicleInspectionController.getById);

// Create a new inspection
router.post('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(vehicleInspectionSchema), logAudit, vehicleInspectionController.create);

// Update an inspection
router.put('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(vehicleInspectionSchema), logAudit, vehicleInspectionController.update);

// Delete an inspection
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Manager', ]), logAudit, vehicleInspectionController.delete);

module.exports = router;
