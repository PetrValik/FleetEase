const roleService = require('../../services/users/roleService');

// Retrieve all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles(); // Fetch all roles
    res.status(200).json(roles); // Respond with the list of roles and a 200 status code
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to fetch roles' }); // Respond with an error message
  }
};

// Retrieve a specific role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id); // Fetch the role by ID
    if (!role) {
      return res.status(404).json({ error: 'Role not found' }); // Respond with 404 if the role is not found
    }
    res.status(200).json(role); // Respond with the retrieved role and a 200 status code
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Failed to fetch role' }); // Respond with an error message
  }
};
