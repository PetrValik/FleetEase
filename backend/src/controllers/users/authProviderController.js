const authProviderService = require('../../services/users/authProviderService');

// GET a single AuthProvider by ID
exports.getAuthProvider = async (req, res) => {
  try {
    const id = req.params.id; // Extract the ID from the request parameters
    const authProvider = await authProviderService.getAuthProviderById(id); // Fetch the AuthProvider by ID
    if (!authProvider) {
      return res.status(404).json({ message: 'AuthProvider not found' }); // Respond with 404 if not found
    }
    res.json(authProvider); // Respond with the retrieved AuthProvider
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Internal server error' }); // Respond with a generic error message
  }
};

// GET all AuthProviders
exports.getAllAuthProviders = async (req, res) => {
  try {
    const authProviders = await authProviderService.getAllAuthProviders(); // Fetch all AuthProviders
    res.json(authProviders); // Respond with the list of AuthProviders
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Internal server error' }); // Respond with a generic error message
  }
};
