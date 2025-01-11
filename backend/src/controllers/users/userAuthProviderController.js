const userAuthProviderService = require('../../services/users/userAuthProviderService');

// Retrieve all user authentication provider records
exports.getAllUserAuthProviders = async (req, res) => {
  try {
    const userAuthProviders = await userAuthProviderService.getAllUserAuthProviders(); // Fetch all records
    res.json(userAuthProviders); // Respond with the list of records
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to fetch user auth providers' }); // Respond with an error message
  }
};

// Retrieve a specific user authentication provider record by ID
exports.getUserAuthProviderById = async (req, res) => {
  try {
    const userAuthProvider = await userAuthProviderService.getUserAuthProviderById(req.params.id); // Fetch the record by ID
    if (!userAuthProvider) {
      return res.status(404).json({ error: 'User auth provider not found' }); // Respond with 404 if not found
    }
    res.json(userAuthProvider); // Respond with the retrieved record
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to fetch user auth provider' }); // Respond with an error message
  }
};

// Create a new user authentication provider record
exports.createUserAuthProvider = async (req, res) => {
  try {
    const newUserAuthProvider = await userAuthProviderService.createUserAuthProvider(req.body); // Create a new record using the request body
    res.status(201).json(newUserAuthProvider); // Respond with the created record and a 201 status code
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to create user auth provider' }); // Respond with an error message
  }
};
