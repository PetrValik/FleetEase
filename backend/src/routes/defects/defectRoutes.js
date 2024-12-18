const express = require('express');
const router = express.Router();
const defectController = require('../../controllers/defects/defectController');
const validate = require('../../middlewares/validate');
const defectSchema = require('../../validationSchemas/defects/defectValidationSchema');
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all defects
router.get('/', authenticateToken, checkRole(['admin', 'manager']), logAudit, defectController.getAllDefects);

// Get a defect by ID
router.get('/:id', authenticateToken, checkRole(['admin', 'manager']), logAudit, defectController.getDefectById);

// Create a new defect
router.post('/', authenticateToken, checkRole(['admin', 'developer']), validate(defectSchema), logAudit, defectController.createDefect);

// Update a defect
router.put('/:id', authenticateToken, checkRole(['admin', 'developer']), validate(defectSchema), logAudit, defectController.updateDefect);

// Delete a defect
router.delete('/:id', authenticateToken, checkRole(['admin']), logAudit, defectController.deleteDefect);

module.exports = router;
