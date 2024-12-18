const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicles/vehicleController');
const validate = require('../../middlewares/validate');
const vehicleSchema = require('../../validationSchemas/vehicles/vehicleSchema');
const authenticateToken = require('../../middlewares/authenticateToken');

// Get all vehicles
router.get('/', authenticateToken, vehicleController.getAll);

// Get a vehicle by ID
router.get('/:id', authenticateToken, vehicleController.getById);

// Create a new vehicle
router.post('/', authenticateToken, validate(vehicleSchema), vehicleController.create);

// Update a vehicle
router.put('/:id', authenticateToken, validate(vehicleSchema), vehicleController.update);

// Delete a vehicle
router.delete('/:id', authenticateToken, vehicleController.delete);

module.exports = router;
