const Joi = require('joi');

const companyValidationSchema = Joi.object({
    company_name: Joi.string()
        .max(255)
        .required(), // Company name, required, max length 255 characters

    description: Joi.string()
        .max(1000) // Description, optional, max length 1000 characters
        .optional(),

    address: Joi.string()
        .max(500) // Address, optional, max length 500 characters
        .optional(),
});

module.exports = companyValidationSchema;
