const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().max(255).required().messages({
        'any.required': 'Name is required.',
        'string.base': 'Name must be a string.',
        'string.max': 'Name cannot exceed 255 characters.',
    }),
    description: Joi.string().max(1000).optional().messages({
        'string.base': 'Description must be a string.',
        'string.max': 'Description cannot exceed 1000 characters.',
    }),
});
