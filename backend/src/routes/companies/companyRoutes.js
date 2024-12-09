const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/companies/companyController');

// GET jedna firma podle ID
router.get('/:id', companyController.getCompany);

// GET všechny firmy
router.get('/', companyController.getAllCompanies);

module.exports = router;
