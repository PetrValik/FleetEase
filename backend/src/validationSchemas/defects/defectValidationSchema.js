const Joi = require('joi');

// Validation schema for defect creation and update
module.exports = Joi.object({
    vehicle_id: Joi.number().integer().required().messages({
        'any.required': 'Vehicle ID is required.',
        'number.base': 'Vehicle ID must be a number.',
        'number.integer': 'Vehicle ID must be an integer.',
    }),
    type_id: Joi.number().integer().required().messages({
        'any.required': 'Defect type ID is required.',
        'number.base': 'Defect type ID must be a number.',
        'number.integer': 'Defect type ID must be an integer.',
    }),
    defect_severity: Joi.string()
        .valid('Minor', 'Low', 'Medium', 'High', 'Critical')
        .required()
        .messages({
            'any.required': 'Defect severity is required.',
            'string.base': 'Defect severity must be a string.',
            'any.only': 'Defect severity must be one of: Minor, Low, Medium, High, or Critical.',
        }),
    defect_status: Joi.string()
        .valid('Reported', 'In Progress', 'Repaired', 'Closed', 'Deferred')
        .required()
        .messages({
            'any.required': 'Defect status is required.',
            'string.base': 'Defect status must be a string.',
            'any.only': 'Defect status must be one of: Reported, In Progress, Repaired, Closed, or Deferred.',
        }),
    description: Joi.string().max(1000).optional().messages({
        'string.base': 'Description must be a string.',
        'string.max': 'Description cannot exceed 1000 characters.',
    }),
    date_reported: Joi.date().required().messages({
        'any.required': 'Date reported is required.',
        'date.base': 'Date reported must be a valid date.',
    }),
    repair_cost: Joi.number().precision(2).optional().messages({
        'number.base': 'Repair cost must be a number.',
        'number.precision': 'Repair cost must have at most 2 decimal places.',
    }),
    user_id: Joi.number().integer().required().messages({
        'any.required': 'User ID is required.',
        'number.base': 'User ID must be a number.',
        'number.integer': 'User ID must be an integer.',
    }),
});
