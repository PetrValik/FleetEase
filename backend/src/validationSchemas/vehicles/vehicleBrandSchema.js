const Joi = require('joi');

module.exports = Joi.object({
    brand_name: Joi.string().max(255).required(),
});
