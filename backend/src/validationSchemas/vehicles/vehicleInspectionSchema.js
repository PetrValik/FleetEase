const Joi = require('joi');

module.exports = Joi.object({
    vehicle_id: Joi.number().integer().required().messages({
        'any.required': 'Vehicle ID is required.',
        'number.base': 'Vehicle ID must be a number.',
    }),
    inspection_type: Joi.string().max(255).required().messages({
        'any.required': 'Inspection type is required.',
        'string.max': 'Inspection type cannot exceed 255 characters.',
    }),
    valid_until: Joi.date().required().messages({
        'any.required': 'Valid until date is required.',
        'date.base': 'Valid until must be a valid date.',
    }),
});
