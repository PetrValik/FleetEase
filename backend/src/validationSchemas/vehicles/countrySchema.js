const Joi = require('joi');

module.exports = Joi.object({
    country_name: Joi.string().max(255).required(),
    country_code2: Joi.string().length(2).required(), // ISO 3166-1 alpha-2
    country_code3: Joi.string().length(3).required(), // ISO 3166-1 alpha-3
    numeric: Joi.number().integer().positive().required(),
});
