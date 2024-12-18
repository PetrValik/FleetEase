const Joi = require('joi');

module.exports = Joi.object({
    category_name: Joi.string().max(255).required(),
    inspection_period: Joi.number().integer().positive().required(),
    emissions_period: Joi.number().integer().positive().required(),
});
