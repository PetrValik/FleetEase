const Joi = require('joi');

module.exports = Joi.object({
    company_name: Joi.string().max(255).required().messages({
        'any.required': 'Company name is required.',
        'string.base': 'Company name must be a string.',
        'string.max': 'Company name cannot exceed 255 characters.',
    }),
});
