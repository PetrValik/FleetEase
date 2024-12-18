const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companies/companyController');
const validate = require('../../middlewares/validate');
const companyValidationSchema = require('../../validationSchemas/companies/companyValidationSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all companies (restricted to admin and manager roles)
router.get(
    '/',
    authenticateToken,
    checkRole(['admin', 'manager']),
    logAudit,
    companyController.getAllCompanies
);

// Get a company by ID (restricted to admin and manager roles)
router.get(
    '/:id',
    authenticateToken,
    checkRole(['admin', 'manager']),
    logAudit,
    companyController.getCompanyById
);

// Create a new company (restricted to admin role)
router.post(
    '/',
    authenticateToken,
    checkRole(['admin']),
    validate(companyValidationSchema), // Validate request body
    logAudit,
    companyController.createCompany
);

// Update a company (restricted to admin role)
router.put(
    '/:id',
    authenticateToken,
    checkRole(['admin']),
    validate(companyValidationSchema), // Validate request body
    logAudit,
    companyController.updateCompany
);

// Delete a company (restricted to admin role)
router.delete(
    '/:id',
    authenticateToken,
    checkRole(['admin']),
    logAudit,
    companyController.deleteCompany
);

module.exports = router;
