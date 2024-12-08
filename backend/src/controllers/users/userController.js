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
