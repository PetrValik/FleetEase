const jwt = require('jsonwebtoken');

const checkRole = (requiredRoles) => async (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    if (!token) {
      return res.status(401).json({ error: 'Access denied, token missing' });
    }

    // Decode the JWT token to get user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user's role from the token payload
    const userRole = decoded.role?.role_name;

    if (!userRole) {
      return res.status(403).json({ error: 'Role not assigned to user' });
    }

    // Check if the user's role is in the list of required roles
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied for this role' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Role validation error:', err);
    res.status(500).json({ error: 'Failed to validate role' });
  }
};

module.exports = checkRole;
