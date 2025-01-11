const Joi = require('joi');

module.exports = Joi.object({
    insurance_types: Joi.string()
        .valid('Driver', 'Vehicle', 'Liability')
        .required()
        .messages({
            'any.required': 'Insurance type is required.',
            'string.base': 'Insurance type must be a string.',
            'any.only': 'Insurance type must be one of: Driver, Vehicle, or Liability.',
        }),
    registration_number: Joi.string()
        .optional()
        .allow(null)
        .messages({
            'string.base': 'Registration number must be a string.',
        }),
    start_date: Joi.date()
        .required()
        .messages({
            'any.required': 'Start date is required.',
            'date.base': 'Start date must be a valid date.',
        }),
    end_date: Joi.date()
        .required()
        .messages({
            'any.required': 'End date is required.',
            'date.base': 'End date must be a valid date.',
        }),
    name: Joi.string()
        .optional()
        .allow(null)
        .messages({
            'string.base': 'Name must be a string.',
        }),
    payment_method: Joi.string()
        .valid('Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'One-Time')
        .required()
        .messages({
            'any.required': 'Payment method is required.',
            'string.base': 'Payment method must be a string.',
            'any.only': 'Payment method must be one of: Monthly, Quarterly, Semi-Annual, Annual, or One-Time.',
        }),
    insurance_company_id: Joi.number()
        .integer()
        .required()
        .messages({
            'any.required': 'Insurance company ID is required.',
            'number.base': 'Insurance company ID must be a number.',
            'number.integer': 'Insurance company ID must be an integer.',
        }),
    insurance_status: Joi.string()
        .valid('Pending', 'Active', 'Archived', 'Ending soon')
        .required()
        .messages({
            'any.required': 'Insurance status is required.',
            'string.base': 'Insurance status must be a string.',
            'any.only': 'Insurance status must be one of: Pending, Active, Archived, or Ending soon.',
        }),
    company_id: Joi.number()
        .integer()
        .required()
        .messages({
            'any.required': 'Company ID is required.',
            'number.base': 'Company ID must be a number.',
            'number.integer': 'Company ID must be an integer.',
        }),
    description: Joi.string()
        .optional()
        .allow(null)
        .messages({
            'string.base': 'Description must be a string.',
        }),
});
