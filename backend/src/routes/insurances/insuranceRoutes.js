const express = require('express');
const router = express.Router();
const insuranceController = require('../../controllers/insurances/insuranceController');
const validate = require('../../middlewares/validate');
const insuranceSchema = require('../../validationSchemas/insurances/insuranceSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all insurances
router.get('/', authenticateToken, checkRole(['admin', 'manager']), logAudit, insuranceController.getAll);

// Get one insurance by ID
router.get('/:id', authenticateToken, checkRole(['admin', 'manager']), logAudit, insuranceController.getById);

// Create a new insurance
router.post('/', authenticateToken, checkRole(['admin']), validate(insuranceSchema), logAudit, insuranceController.create);

// Update an insurance
router.put('/:id', authenticateToken, checkRole(['admin']), validate(insuranceSchema), logAudit, insuranceController.update);

// Delete an insurance
router.delete('/:id', authenticateToken, checkRole(['admin']), logAudit, insuranceController.delete);

module.exports = router;
