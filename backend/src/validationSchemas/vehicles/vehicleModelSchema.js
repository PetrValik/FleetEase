const Joi = require('joi');

module.exports = Joi.object({
    brand_id: Joi.number().integer().positive().required().messages({
        'any.required': 'Brand ID is required.',
        'number.base': 'Brand ID must be a number.',
        'number.integer': 'Brand ID must be an integer.',
        'number.positive': 'Brand ID must be a positive number.',
    }),
    model_name: Joi.string().max(255).required().messages({
        'any.required': 'Model name is required.',
        'string.base': 'Model name must be a string.',
        'string.max': 'Model name cannot exceed 255 characters.',
    }),
});
