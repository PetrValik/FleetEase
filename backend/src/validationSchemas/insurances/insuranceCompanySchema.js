const Joi = require('joi');

module.exports = Joi.object({
    company_name: Joi.string().max(255).required(), // Company name is required, max length 255
});
