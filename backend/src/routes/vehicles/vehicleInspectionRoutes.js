const express = require('express');
const router = express.Router();
const vehicleInspectionController = require('../../controllers/vehicles/vehicleInspectionController');
const validate = require('../../middlewares/validate');
const vehicleInspectionSchema = require('../../validationSchemas/vehicles/vehicleInspectionSchema');
const authenticateToken = require('../../middlewares/authenticateToken');

// Get all inspections
router.get('/', authenticateToken, vehicleInspectionController.getAll);

// Get an inspection by ID
router.get('/:id', authenticateToken, vehicleInspectionController.getById);

// Create a new inspection
router.post('/', authenticateToken, validate(vehicleInspectionSchema), vehicleInspectionController.create);

// Update an inspection
router.put('/:id', authenticateToken, validate(vehicleInspectionSchema), vehicleInspectionController.update);

// Delete an inspection
router.delete('/:id', authenticateToken, vehicleInspectionController.delete);

module.exports = router;
