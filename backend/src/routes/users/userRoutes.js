const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const validate = require('../../middlewares/validate');
const userCreationSchema = require('../../validationSchemas/users/userCreationSchema'); // Schema for creating/updating users
const userLoginSchema = require('../../validationSchemas/users/userLoginSchema'); // Schema for login
const authenticateToken = require('../../middlewares/authenticateToken'); // Middleware for JWT authentication
const checkRole = require('../../middlewares/checkRole'); // Middleware for role-based access control
const { userValidationSchema, userIdSchema } = require('../../validationSchemas/users/userValidationSchema');

// User registration (open to anyone)
router.post(
  '/register',
  validate(userCreationSchema), // Validate user creation data
  userController.register
);

// User login (open to anyone)
router.post(
  '/login',
  validate(userLoginSchema), // Validate login credentials
  userController.login
);

// Check if an email exists (public endpoint)
router.get(
  '/email/:email',
  userController.checkEmailExists
);

// Get all users (restricted to admin users)
router.get(
  '/',
  authenticateToken,
  checkRole(['admin']), // Admin-only access
  userController.getAllUsers
);

// Get a single user by ID (restricted to admin or manager roles)
router.get(
  '/:id',
  authenticateToken,
  checkRole(['admin', 'manager']), // Admin and manager access
  userController.getUserById
);

// Update user route
router.put(
  '/:id',
  authenticateToken,
  validate(userIdSchema), // Validate ID parameter
  validate(userValidationSchema), // Validate request body
  userController.updateUser
);

// Delete user route
router.delete(
  '/:id',
  authenticateToken,
  validate(userIdSchema), // Validate ID parameter
  userController.deleteUser
);

module.exports = router;
