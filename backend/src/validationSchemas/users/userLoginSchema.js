const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.base': 'Email must be a string.',
    'string.email': 'Email must be in a valid email format.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
    'string.base': 'Password must be a string.',
  }),
});
