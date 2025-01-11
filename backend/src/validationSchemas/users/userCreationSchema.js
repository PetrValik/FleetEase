const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be in a valid email format.',
  }),
  password: Joi.string().optional().messages({
    'string.base': 'Password must be a string.',
  }),
  first_name: Joi.string().required().messages({
    'any.required': 'First name is required.',
    'string.base': 'First name must be a string.',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Last name is required.',
    'string.base': 'Last name must be a string.',
  }),
  phone_number: Joi.string().optional().messages({
    'string.base': 'Phone number must be a string.',
  }),
  roles_id: Joi.number().optional().messages({
    'number.base': 'Role ID must be a number.',
  }),
  company_id: Joi.number().optional().messages({
    'number.base': 'Company ID must be a number.',
  }),
});
