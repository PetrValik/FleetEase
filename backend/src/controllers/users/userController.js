const Joi = require('joi');
const userService = require('../../services/users/userService');

// Register a new user
exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body); // Register the user using the service
    res.status(201).json({ message: 'User registered successfully', user }); // Respond with success
  } catch (error) {
    console.error(error); // Log the error
    res.status(400).json({ error: error.message }); // Respond with an error
  }
};
  
// Log in a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body
    const { token, user } = await userService.loginUser(email, password); // Authenticate the user
    res.json({ token, user }); // Respond with the token and user details
  } catch (error) {
    console.error(error); // Log the error
    res.status(401).json({ error: error.message }); // Respond with an authentication error
  }
};

// Verify a user using a token
exports.verify = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ error: "No token provided" }); // Respond if the token is missing
    }
    const { user } = await userService.verifyUser(token); // Verify the token
    res.json({ user }); // Respond with the verified user
  } catch (error) {
    console.error("User verification failed:", error); // Log the error
    res.status(401).json({ error: error.message }); // Respond with an authentication error
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Fetch all users from the service
    res.json(users); // Respond with the user list
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch users' }); // Respond with an error
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id); // Fetch the user by ID
    if (!user) return res.status(404).json({ error: 'User not found' }); // Respond if the user is not found
    res.json(user); // Respond with the user details
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch user' }); // Respond with an error
  }
};

// Check if an email exists
exports.checkEmailExists = async (req, res) => {
  try {
    const email = req.params.email; // Extract the email from request parameters
    const emailValidation = Joi.string().email().validate(email); // Validate the email format
    if (emailValidation.error) {
      return res.status(400).json({ error: 'Invalid email format' }); // Respond if the email is invalid
    }
    const exists = await userService.checkEmailExists(email); // Check if the email exists
    res.status(200).json({ exists }); // Respond with the result
  } catch (error) {
    console.error('Error in checkEmailExists:', error); // Log the error
    res.status(500).json({ error: 'Failed to check email' }); // Respond with an error
  }
};

// Update a user's details
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body); // Update the user
    res.json(updatedUser); // Respond with the updated user details
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with an error
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id); // Delete the user
    res.json({ message: 'User deleted successfully' }); // Respond with success
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with an error
  }
};

// Get all users from a specific company
exports.getAllUsersFromCompany = async (req, res) => {
  const { companyId } = req.params; // Extract the company ID from the request parameters
  const currentUserId = req.user?.user_id; // Assume `req.user` is populated by middleware
  try {
    const users = await userService.getAllUsersFromCompany(companyId, currentUserId); // Fetch users from the company
    res.json(users); // Respond with the user list
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch users from the specified company' }); // Respond with an error
  }
};

// Get all users without a company
exports.getAllUsersWithoutCompany = async (req, res) => {
  try {
    const users = await userService.getAllUsersWithoutCompany(); // Fetch users without a company
    res.json(users); // Respond with the user list
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to fetch users without a company' }); // Respond with an error
  }
};

// Google Sign-In
exports.googleSign = async (req, res) => {
  try {
    const { firstName, lastName, email, localId, providerId } = req.body; // Extract user details from the request body
    const { token, user } = await userService.googleSign(firstName, lastName, email, localId, providerId); // Handle Google Sign-In
    res.json({ token, user }); // Respond with the token and user details
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to perform Google Sign-In' }); // Respond with an error
  }
};
