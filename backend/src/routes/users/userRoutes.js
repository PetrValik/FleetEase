const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const validate = require('../../middlewares/validate');
const userCreationSchema = require('../../validationSchemas/users/userCreationSchema'); // Schema for creating/updating users
const userLoginSchema = require('../../validationSchemas/users/userLoginSchema'); // Schema for login
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware for JWT authentication
const checkRole = require('../../middlewares/checkRole'); // Middleware for role-based access control
const { userValidationSchema, userIdSchema } = require('../../validationSchemas/users/userValidationSchema');
const logAudit = require('../../middlewares/auditLogger');

// User registration (open to anyone)
router.post(
  '/register',
  validate(userCreationSchema), // Validate user creation data
  logAudit,
  userController.register
);

// User login (open to anyone)
router.post(
  '/login',
  validate(userLoginSchema), // Validate login credentials
  logAudit,
  userController.login
);

// Check if an email exists (public endpoint)
router.get(
  '/email/:email',
  logAudit,
  userController.checkEmailExists
);

// Get all users (restricted to admin users)
router.get(
  '/',
  authenticateToken,
  checkRole(['Admin']), 
  logAudit,
  userController.getAllUsers
);

// Get all users without a company
router.get(
  '/without-company',
  authenticateToken,
  checkRole(['Admin', 'Manager']), // Restricted to Admins and Managers
  logAudit,
  userController.getAllUsersWithoutCompany
);

// Get all users from a specific company
router.get(
  '/company/:companyId',
  authenticateToken,
  checkRole(['Admin', 'Manager']), // Restricted to Admins and Managers
  logAudit,
  userController.getAllUsersFromCompany
);

// Get a single user by ID (restricted to admin or manager roles)
router.get(
  '/:id',
  authenticateToken,
  checkRole(['Admin', 'Manager']), 
  logAudit,
  userController.getUserById
);

// Update user route
router.put(
  '/:id',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), 
  validate(userValidationSchema), // Validate request body
  logAudit,
  userController.updateUser
);

// Delete user route
router.delete(
  '/:id',
  authenticateToken,
  checkRole(['Admin', 'Manager', 'Driver']), 
  logAudit,
  userController.deleteUser
);

module.exports = router;
