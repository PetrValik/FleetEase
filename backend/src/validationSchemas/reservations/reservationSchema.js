const Joi = require('joi');

module.exports = Joi.object({
    vehicle_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date().required(),
    pickup_location: Joi.string().max(255).required(),
    return_location: Joi.string().max(255).required(),
    reservation_status: Joi.string()
        .valid('Pending', 'Confirmed', 'Cancelled', 'Completed', 'Rejected')
        .required(),
    notes: Joi.string().max(1000).optional(),
});
