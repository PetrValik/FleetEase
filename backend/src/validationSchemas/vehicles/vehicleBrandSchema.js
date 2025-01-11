const Joi = require('joi');

module.exports = Joi.object({
    brand_name: Joi.string().max(255).required().messages({
        'any.required': 'Brand name is required.',
        'string.base': 'Brand name must be a string.',
        'string.max': 'Brand name cannot exceed 255 characters.',
    }),
});
