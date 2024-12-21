const express = require('express');
const router = express.Router();
const vehicleCategoryController = require('../../controllers/vehicles/vehicleCategoryController');
const validate = require('../../middlewares/validate');
const vehicleCategorySchema = require('../../validationSchemas/vehicles/vehicleCategorySchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all vehicle categories
router.get('/', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, vehicleCategoryController.getAll);

// Get one vehicle category by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, vehicleCategoryController.getById);

// Create a new vehicle category
router.post('/', authenticateToken, checkRole(['Admin']), validate(vehicleCategorySchema), logAudit, vehicleCategoryController.create);

// Update a vehicle category
router.put('/:id', authenticateToken, checkRole(['Admin']), validate(vehicleCategorySchema), logAudit, vehicleCategoryController.update);

// Delete a vehicle category
router.delete('/:id', authenticateToken, checkRole(['Admin']), logAudit, vehicleCategoryController.delete);

module.exports = router;
