// models/registerValidator.js
const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().optional(),
  roles_id: Joi.number().required(),
  company_id: Joi.number().required(),
});
