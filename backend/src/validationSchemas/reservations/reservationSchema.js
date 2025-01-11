const Joi = require('joi');

module.exports = Joi.object({
    vehicle_id: Joi.number().integer().required().messages({
        'any.required': 'Vehicle ID is required.',
        'number.base': 'Vehicle ID must be a number.',
        'number.integer': 'Vehicle ID must be an integer.',
    }),
    user_id: Joi.number().integer().required().messages({
        'any.required': 'User ID is required.',
        'number.base': 'User ID must be a number.',
        'number.integer': 'User ID must be an integer.',
    }),
    start_time: Joi.date().required().messages({
        'any.required': 'Start time is required.',
        'date.base': 'Start time must be a valid date.',
    }),
    end_time: Joi.date().required().messages({
        'any.required': 'End time is required.',
        'date.base': 'End time must be a valid date.',
    }),
    pickup_location: Joi.string().max(255).required().messages({
        'any.required': 'Pickup location is required.',
        'string.base': 'Pickup location must be a string.',
        'string.max': 'Pickup location cannot exceed 255 characters.',
    }),
    return_location: Joi.string().max(255).required().messages({
        'any.required': 'Return location is required.',
        'string.base': 'Return location must be a string.',
        'string.max': 'Return location cannot exceed 255 characters.',
    }),
    reservation_status: Joi.string()
        .valid('Pending', 'Confirmed', 'Cancelled', 'Completed', 'Rejected')
        .required()
        .messages({
            'any.required': 'Reservation status is required.',
            'string.base': 'Reservation status must be a string.',
            'any.only': 'Reservation status must be one of: Pending, Confirmed, Cancelled, Completed, or Rejected.',
        }),
    notes: Joi.string().max(1000).optional().allow(null).messages({
        'string.base': 'Notes must be a string.',
        'string.max': 'Notes cannot exceed 1000 characters.',
    }),
});
