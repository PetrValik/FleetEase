const express = require('express');
const router = express.Router();
const defectController = require('../../controllers/defects/defectController');
const validate = require('../../middlewares/validate');
const defectSchema = require('../../validationSchemas/defects/defectValidationSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all defects
router.get('/', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, defectController.getAllDefects);

// Get a defect by ID
router.get('/:id', authenticateToken, checkRole(['Admin', 'Manager']), logAudit, defectController.getDefectById);

// Create a new defect
router.post('/', authenticateToken, checkRole(['Admin', 'Driver']), validate(defectSchema), logAudit, defectController.createDefect);

// Update a defect
router.put('/:id', authenticateToken, checkRole(['Admin', 'Manager']), validate(defectSchema), logAudit, defectController.updateDefect);

// Delete a defect
router.delete('/:id', authenticateToken, checkRole(['Admin']), logAudit, defectController.deleteDefect);

module.exports = router;
