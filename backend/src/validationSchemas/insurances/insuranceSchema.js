const Joi = require('joi');

module.exports = Joi.object({
    insurance_types: Joi.string().valid('Driver', 'Vehicle', 'Liability').required(),
    registration_number: Joi.string().optional().allow(null),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    name: Joi.string().optional().allow(null),
    payment_method: Joi.string().valid('Monthly', 'Quarterly', 'Yearly', 'One-Time').required(),
    insurance_company_id: Joi.number().integer().required(),
    insurance_status: Joi.string().valid('Active', 'Pending', 'Expired', 'Cancelled').required(),
    company_id: Joi.number().integer().required(),
    description: Joi.string().optional().allow(null),
});
