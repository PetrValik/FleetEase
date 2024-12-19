const express = require('express');
const router = express.Router();
const authProviderController = require('../../controllers/users/authProviderController');
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware for JWT authentication
const logAudit = require('../../middlewares/auditLogger'); // Middleware for audit logging
const checkRole = require('../../middlewares/checkRole'); // Middleware for role-based access control

// Get all authentication providers (accessible only to authenticated admin users)
router.get(
  '/',
  authenticateToken,
  checkRole(['Admin']), // Restrict access to admin users
  logAudit, // Log the operation
  authProviderController.getAllAuthProviders
);

// Get an authentication provider by ID (accessible only to authenticated admin users)
router.get(
  '/:id',
  authenticateToken,
  checkRole(['Admin']), // Restrict access to admin users
  logAudit, // Log the operation
  authProviderController.getAuthProvider
);

module.exports = router;
