const Joi = require('joi');

// Validation schema for creating/updating a user
exports.userValidationSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address.',
    'string.base': 'Email must be a string.',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.base': 'Password must be a string.',
  }),
  first_name: Joi.string().max(255).optional().messages({
    'string.max': 'First name cannot exceed 255 characters.',
    'string.base': 'First name must be a string.',
  }),
  last_name: Joi.string().max(255).optional().messages({
    'string.max': 'Last name cannot exceed 255 characters.',
    'string.base': 'Last name must be a string.',
  }),
  phone_number: Joi.string().optional().messages({
    'string.base': 'Phone number must be a string.',
  }),
  roles_id: Joi.number().integer().optional().messages({
    'number.base': 'Role ID must be a number.',
    'number.integer': 'Role ID must be an integer.',
  }),
  company_id: Joi.number().integer().optional().allow(null).messages({
    'number.base': 'Company ID must be a number.',
    'number.integer': 'Company ID must be an integer.',
  }),
});
