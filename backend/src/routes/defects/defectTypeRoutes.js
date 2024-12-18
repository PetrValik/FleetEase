const express = require('express');
const router = express.Router();
const defectTypeController = require('../../controllers/defects/defectTypeController');
const validate = require('../../middlewares/validate');
const defectTypeSchema = require('../../validationSchemas/defects/defectTypeValidationSchema'); // Validation schema
const authenticateToken = require('../../middlewares/authenticateToken');
const checkRole = require('../../middlewares/checkRole');
const logAudit = require('../../middlewares/auditLogger');

// Get all defect types (restricted to admin and manager roles)
router.get(
    '/',
    authenticateToken,
    checkRole(['admin', 'manager']),
    logAudit,
    defectTypeController.getAllDefectTypes
);

// Get a defect type by ID (restricted to admin and manager roles)
router.get(
    '/:id',
    authenticateToken,
    checkRole(['admin', 'manager']),
    logAudit,
    defectTypeController.getDefectTypeById
);

// Create a new defect type (restricted to admin role)
router.post(
    '/',
    authenticateToken,
    checkRole(['admin']),
    validate(defectTypeSchema), // Validate request body
    logAudit,
    defectTypeController.createDefectType
);

// Update a defect type (restricted to admin role)
router.put(
    '/:id',
    authenticateToken,
    checkRole(['admin']),
    validate(defectTypeSchema), // Validate request body
    logAudit,
    defectTypeController.updateDefectType
);

// Delete a defect type (restricted to admin role)
router.delete(
    '/:id',
    authenticateToken,
    checkRole(['admin']),
    logAudit,
    defectTypeController.deleteDefectType
);

module.exports = router;
