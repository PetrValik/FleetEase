const authProviderService = require('../../services/users/authProviderService');

// GET jeden AuthProvider podle ID
exports.getAuthProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const authProvider = await authProviderService.getAuthProviderById(id);
    if (!authProvider) {
      return res.status(404).json({ message: 'AuthProvider not found' });
    }
    res.json(authProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET všechny AuthProviders
exports.getAllAuthProviders = async (req, res) => {
  try {
    const authProviders = await authProviderService.getAllAuthProviders();
    res.json(authProviders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
