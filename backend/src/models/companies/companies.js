const Joi = require('joi');

const companyValidationSchema = Joi.object({
    company_id: Joi.number()
        .integer()
        .min(1)
        .required(), // Primární klíč, vyžaduje celé číslo >= 1

    company_name: Joi.string()
        .max(255)
        .required(), // Název společnosti, povinný, max. délka 255 znaků

    description: Joi.string()
        .max(1000) // Popis společnosti, nepovinný, max. délka 1000 znaků
        .optional(),
});

module.exports = companyValidationSchema;
