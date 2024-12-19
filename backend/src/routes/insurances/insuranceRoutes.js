const express = require('express');
const router = express.Router();
const insuranceController = require('../../controllers/insurances/insuranceController');

// Get insurance companies
router.get('/companies', insuranceController.getInsuranceCompanies);

// Get all insurances
router.get('/', insuranceController.getAllInsurances);

// Get single insurance
router.get('/:id', insuranceController.getInsuranceById);

// Create new insurance
router.post('/', insuranceController.createInsurance);

// Update insurance
router.put('/:id', insuranceController.updateInsurance);

// Delete insurance
router.delete('/:id', insuranceController.deleteInsurance);

module.exports = router;