const Joi = require('joi');

module.exports = Joi.object({
    country_name: Joi.string().max(255).required().messages({
        'any.required': 'Country name is required.',
        'string.base': 'Country name must be a string.',
        'string.max': 'Country name cannot exceed 255 characters.',
    }),
    country_code2: Joi.string().length(2).required().messages({
        'any.required': 'Country code (ISO 3166-1 alpha-2) is required.',
        'string.base': 'Country code must be a string.',
        'string.length': 'Country code must be exactly 2 characters long.',
    }),
    country_code3: Joi.string().length(3).required().messages({
        'any.required': 'Country code (ISO 3166-1 alpha-3) is required.',
        'string.base': 'Country code must be a string.',
        'string.length': 'Country code must be exactly 3 characters long.',
    }),
    numeric: Joi.number().integer().positive().required().messages({
        'any.required': 'Numeric country code is required.',
        'number.base': 'Numeric country code must be a number.',
        'number.integer': 'Numeric country code must be an integer.',
        'number.positive': 'Numeric country code must be a positive number.',
    }),
});
