const Joi = require('joi');

const companyValidationSchema = Joi.object({
    company_name: Joi.string()
        .max(255)
        .required()
        .messages({
            'any.required': 'Company name is required.',
            'string.base': 'Company name must be a string.',
            'string.max': 'Company name cannot exceed 255 characters.',
        }),

    description: Joi.string()
        .max(1000)
        .optional()
        .messages({
            'string.base': 'Description must be a string.',
            'string.max': 'Description cannot exceed 1000 characters.',
        }),

    address: Joi.string()
        .max(500)
        .optional()
        .messages({
            'string.base': 'Address must be a string.',
            'string.max': 'Address cannot exceed 500 characters.',
        }),
});

module.exports = companyValidationSchema;
