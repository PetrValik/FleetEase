const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required(), // Email is required and must be a valid email format
  password: Joi.string().required(), // Password is required for login
});
