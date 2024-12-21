const express = require('express');
const router = express.Router();
const insuranceCompanyController = require('../../controllers/insurances/insuranceCompanyController');
const validate = require('../../middlewares/validate');
const insuranceCompanySchema = require('../../validationSchemas/insurances/insuranceCompanySchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all insurance companies
router.get('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, insuranceCompanyController.getAll);

// Get one insurance company by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, insuranceCompanyController.getById);

// Create a new insurance company
router.post('/', authenticateToken, checkRole(['Admin']), validate(insuranceCompanySchema), logAudit, insuranceCompanyController.create);

// Update an insurance company
router.put('/:id', authenticateToken, checkRole(['Admin']), validate(insuranceCompanySchema), logAudit, insuranceCompanyController.update);

// Delete an insurance company
router.delete('/:id', authenticateToken, checkRole(['Admin']), logAudit, insuranceCompanyController.delete);

module.exports = router;
