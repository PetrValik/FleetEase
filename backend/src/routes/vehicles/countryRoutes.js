const express = require('express');
const router = express.Router();
const countryController = require('../../controllers/vehicles/countryController');
const validate = require('../../middlewares/validate');
const countrySchema = require('../../validationSchemas/vehicles/countrySchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all countries
router.get('/', authenticateToken, checkRole(['admin', 'manager']), logAudit, countryController.getAll);

// Get one country by ID
router.get('/:id', authenticateToken, checkRole(['admin', 'manager']), logAudit, countryController.getById);

// Create a new country
router.post('/', authenticateToken, checkRole(['admin']), validate(countrySchema), logAudit, countryController.create);

// Update a country
router.put('/:id', authenticateToken, checkRole(['admin']), validate(countrySchema), logAudit, countryController.update);

// Delete a country
router.delete('/:id', authenticateToken, checkRole(['admin']), logAudit, countryController.delete);

module.exports = router;
