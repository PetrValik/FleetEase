const Joi = require('joi');

module.exports = Joi.object({
    model_id: Joi.number().integer().required().messages({
        'any.required': 'Model ID is required.',
        'number.base': 'Model ID must be a number.',
    }),
    registration_number: Joi.string().max(255).required().messages({
        'any.required': 'Registration number is required.',
        'string.max': 'Registration number cannot exceed 255 characters.',
    }),
    vin: Joi.string().max(255).required().messages({
        'any.required': 'VIN is required.',
        'string.max': 'VIN cannot exceed 255 characters.',
    }),
    category_id: Joi.number().integer().required().messages({
        'any.required': 'Category ID is required.',
        'number.base': 'Category ID must be a number.',
    }),
    country_id: Joi.number().integer().required().messages({
        'any.required': 'Country ID is required.',
        'number.base': 'Country ID must be a number.',
    }),
    fuel_type: Joi.string().valid(
        'Diesel',
        'Natural 95',
        'Natural 98',
        'Electric',
        'Hybrid',
        'Plug-in Hybrid',
        'CNG',
        'LPG',
        'Hydrogen',
        'Ethanol',
        'Bio-Diesel',
        'Synthetic Fuels'
    ).required().messages({
        'any.required': 'Fuel type is required.',
        'any.only': 'Invalid fuel type provided.',
    }),
    vehicle_status: Joi.string().valid(
        'Available',
        'Reserved',
        'In Maintenance',
        'Defect State',
        'Out of Order',
        'Decommissioned'
    ).required().messages({
        'any.required': 'Vehicle status is required.',
        'any.only': 'Invalid vehicle status provided.',
    }),
    created_at: Joi.date().optional().messages({
        'date.base': 'Created at must be a valid date.',
    }),
    company_id: Joi.number().integer().required().messages({
        'any.required': 'Company ID is required.',
        'number.base': 'Company ID must be a number.',
    }),
});
