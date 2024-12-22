const Joi = require('joi');

// Validation schema for creating/updating a user
exports.userValidationSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  first_name: Joi.string().max(255).optional(),
  last_name: Joi.string().max(255).optional(),
  phone_number: Joi.string().optional(),
  roles_id: Joi.number().integer().optional(),
  company_id: Joi.number().integer().optional().allow(null),
});