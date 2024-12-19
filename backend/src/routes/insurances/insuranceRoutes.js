const express = require('express');
const router = express.Router();
const insuranceController = require('../../controllers/insurances/insuranceController');
const validate = require('../../middlewares/validate');
const insuranceSchema = require('../../validationSchemas/insurances/insuranceSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all insurances
router.get('/', checkRole(['Admin', 'Manager', 'Driver']), authenticateToken, logAudit, insuranceController.getAll);

// Get one insurance by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, insuranceController.getById);

// Create a new insurance
router.post('/', authenticateToken, checkRole(['Admin', 'Manager']), validate(insuranceSchema), logAudit, insuranceController.create);

// Update an insurance
router.put('/:id', authenticateToken, checkRole(['Admin', 'Manager']), validate(insuranceSchema), logAudit, insuranceController.update);

// Delete an insurance
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, insuranceController.delete);

// Route to get filtered insurances
router.get('/filter', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']),insuranceController.getInsurancesByTypeAndCompany);

module.exports = router;
