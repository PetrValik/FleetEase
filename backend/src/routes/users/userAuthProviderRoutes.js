const express = require('express');
const router = express.Router();
const userAuthProviderController = require('../../controllers/users/userAuthProviderController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware for JWT authentication
const logAudit = require('../../middlewares/auditLogger'); // Middleware for audit logging
const checkRole = require('../../middlewares/checkRole'); // Middleware for role-based access control

// Get all user authentication providers (accessible only to authenticated admin users)
router.get(
  '/',
  authenticateToken,
  checkRole(['Admin']), // Restrict access to admin users
  logAudit, // Log the operation
  userAuthProviderController.getAllUserAuthProviders
);

// Get a specific user authentication provider by ID (accessible only to authenticated admin users)
router.get(
  '/:id',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), // Restrict access to admin users
  logAudit, // Log the operation
  userAuthProviderController.getUserAuthProviderById
);

// Create a new user authentication provider (accessible only to authenticated admin users)
router.post(
  '/',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), // Restrict access to admin users
  logAudit, // Log the operation
  userAuthProviderController.createUserAuthProvider
);

module.exports = router;
