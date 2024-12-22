const express = require('express');
const router = express.Router();
const defectController = require('../../controllers/defects/defectController');
const validate = require('../../middlewares/validate');
const defectSchema = require('../../validationSchemas/defects/defectValidationSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get defects by user ID
router.get('/user/:userId', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, defectController.getDefectsByUserId);

// Get defects by vehicle ID
router.get('/vehicle/:vehicleId', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, defectController.getDefectsByVehicleId);

// Get all defects
router.get('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, defectController.getAllDefects);

// Get a defect by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), logAudit, defectController.getDefectById);

// Create a new defect
router.post('/', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(defectSchema), logAudit, defectController.createDefect);

// Update a defect
router.put('/:id', authenticateToken, checkRole(['Admin', 'Manager', 'Driver']), validate(defectSchema), logAudit, defectController.updateDefect);

// Delete a defect
router.delete('/:id', authenticateToken, checkRole(['Admin', 'Manager',]), logAudit, defectController.deleteDefect);

module.exports = router;
