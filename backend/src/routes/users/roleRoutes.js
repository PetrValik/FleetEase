const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/users/roleController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware for JWT authentication
const logAudit = require('../../middlewares/auditLogger'); // Middleware for audit logging
const checkRole = require('../../middlewares/checkRole'); // Middleware for role-based access control

// Get all roles (accessible only to authenticated admin users)
router.get(
  '/',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), // Restrict access to admin users
  logAudit, // Log the operation
  roleController.getAllRoles
);

// Get a role by ID (accessible only to authenticated admin users)
router.get(
  '/:id',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), // Restrict access to admin users
  logAudit, // Log the operation
  roleController.getRoleById
);

module.exports = router;
