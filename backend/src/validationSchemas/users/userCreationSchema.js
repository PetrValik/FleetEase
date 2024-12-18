const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required(), // Email is required and must be a valid email format
  password: Joi.string().optional(), // Password is optional (useful for updates where password might not be changed)
  first_name: Joi.string().required(), // First name is required
  last_name: Joi.string().required(), // Last name is required
  phone_number: Joi.string().optional(), // Phone number is optional
  roles_id: Joi.number().optional(), // Role ID is optional (can be set by admin during creation)
  company_id: Joi.number().optional(), // Company ID is optional (user may or may not be linked to a company)
});
