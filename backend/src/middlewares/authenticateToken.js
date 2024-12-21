const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token after 'Bearer'

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' }); // Respond with 401 if no token
  }

  try {
    // Verify the token using the secret key and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Respond with 401 if the token is invalid
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
