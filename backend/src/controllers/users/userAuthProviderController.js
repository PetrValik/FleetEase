const userAuthProviderService = require('../../services/users/userAuthProviderService');

// Získání všech záznamů
exports.getAllUserAuthProviders = async (req, res) => {
  try {
    const userAuthProviders = await userAuthProviderService.getAllUserAuthProviders();
    res.json(userAuthProviders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user auth providers' });
  }
};

// Získání jednoho záznamu podle ID
exports.getUserAuthProviderById = async (req, res) => {
  try {
    const userAuthProvider = await userAuthProviderService.getUserAuthProviderById(req.params.id);
    if (!userAuthProvider) return res.status(404).json({ error: 'User auth provider not found' });
    res.json(userAuthProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user auth provider' });
  }
};

// Vytvoření nového záznamu
exports.createUserAuthProvider = async (req, res) => {
  try {
    const newUserAuthProvider = await userAuthProviderService.createUserAuthProvider(req.body);
    res.status(201).json(newUserAuthProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user auth provider' });
  }
};
