const Joi = require('joi');

module.exports = Joi.object({
    category_name: Joi.string().max(255).required().messages({
        'any.required': 'Category name is required.',
        'string.base': 'Category name must be a string.',
        'string.max': 'Category name cannot exceed 255 characters.',
    }),
    inspection_period: Joi.number().integer().positive().required().messages({
        'any.required': 'Inspection period is required.',
        'number.base': 'Inspection period must be a number.',
        'number.integer': 'Inspection period must be an integer.',
        'number.positive': 'Inspection period must be a positive number.',
    }),
    emissions_period: Joi.number().integer().positive().required().messages({
        'any.required': 'Emissions period is required.',
        'number.base': 'Emissions period must be a number.',
        'number.integer': 'Emissions period must be an integer.',
        'number.positive': 'Emissions period must be a positive number.',
    }),
});
