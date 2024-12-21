const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().max(255).required(), // Name is required, max length 255
    description: Joi.string().max(1000).optional(), // Description is optional, max length 1000
});
