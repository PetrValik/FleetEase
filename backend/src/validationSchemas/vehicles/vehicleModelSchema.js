const Joi = require('joi');

module.exports = Joi.object({
    brand_id: Joi.number().integer().positive().required(),
    model_name: Joi.string().max(255).required(),
});
