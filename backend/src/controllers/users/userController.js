const Joi = require('joi');
const userService = require('../../services/users/userService');

// Registrace uživatele
exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Přihlášení uživatele
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

// Získání všech uživatelů
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Získání jednoho uživatele podle ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Check if an email exists
exports.checkEmailExists = async (req, res) => {
  try {
    // Extract the email from request parameters
    const email = req.params.email;

    // Validate the email format
    const emailValidation = Joi.string().email().validate(email);
    if (emailValidation.error) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Use the service to check if the email exists
    const exists = await userService.checkEmailExists(email);

    // Respond with the result
    res.status(200).json({ exists });
  } catch (error) {
    // Log and handle errors
    console.error('Error in checkEmailExists:', error);
    res.status(500).json({ error: 'Failed to check email' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsersFromCompany = async (req, res) => {
  const { companyId } = req.params;
  const currentUserId = req.user?.user_id; // Assuming `req.user` is populated by a middleware
  try {
    const users = await userService.getAllUsersFromCompany(companyId, currentUserId);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users from the specified company' });
  }
};


exports.getAllUsersWithoutCompany = async (req, res) => {
  try {
    const users = await userService.getAllUsersWithoutCompany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users without a company' });
  }
};
