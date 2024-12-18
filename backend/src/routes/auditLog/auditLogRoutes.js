const express = require('express');
const router = express.Router();
const auditLogController = require('../../controllers/auditLog/auditLogController');
const authenticateToken = require('../../middlewares/authenticateToken'); // JWT authentication middleware
const checkRole = require('../../middlewares/checkRole'); // Role-based access control

// Get all audit logs (restricted to admin users)
router.get(
    '/',
    authenticateToken,
    checkRole(['admin']), // Only admins can view audit logs
    auditLogController.getAllAuditLogs
);

module.exports = router;
