const Joi = require('joi');

// Validation schema for creating/updating a user
exports.userValidationSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  first_name: Joi.string().max(255).optional(),
  last_name: Joi.string().max(255).optional(),
  phone_number: Joi.string().optional(),
  roles_id: Joi.number().integer().optional(),
  company_id: Joi.number().integer().optional(),
});

// Validation schema for user ID parameter
exports.userIdSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});
