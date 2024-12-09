// models/registerValidator.js
const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().optional(),
  roles_id: Joi.number().optional(),
  company_id: Joi.number().optional(),
});
