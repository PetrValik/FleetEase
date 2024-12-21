const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/vehicles/vehicleController');
const validate = require('../../middlewares/validate');
const vehicleSchema = require('../../validationSchemas/vehicles/vehicleSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const logAudit = require('../../middlewares/auditLogger');
const checkRole = require('../../middlewares/checkRole');

// Get all vehicles
router.get('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, vehicleController.getAll);

// Get a vehicle by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, vehicleController.getById);

// Create a new vehicle
router.post('/', authenticateToken, validate(vehicleSchema), checkRole(['Admin', 'Manager']), logAudit, vehicleController.create);

// Update a vehicle
router.put('/:id', authenticateToken, validate(vehicleSchema), checkRole(['Admin', 'Manager']), logAudit, vehicleController.update);

// Delete a vehicle
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, vehicleController.delete);

// Get all vehicles by company ID
router.get('/company/:companyId', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), vehicleController.getVehiclesByCompanyId);


module.exports = router;
