const Joi = require('joi');

module.exports = Joi.object({
    insurance_types: Joi.string()
        .valid('Driver', 'Vehicle', 'Liability')
        .required(),
    policy_number: Joi.string().max(255).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    premium_amount: Joi.number().positive().required(),
    payment_method: Joi.string()
        .valid('Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'One-Time')
        .required(),
    insurance_company_id: Joi.number().integer().required(),
    insurance_status: Joi.string()
        .valid('Pending', 'Active', 'Archived', 'Ending soon')
        .required(),
    company_id: Joi.number().integer().required(),
    description: Joi.string().optional().max(1000),
});
