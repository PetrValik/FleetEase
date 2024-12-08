const Joi = require('joi');

const defectTypeValidationSchema = Joi.object({
    type_id: Joi.number()
        .integer()
        .positive()
        .required(), // ID typu závady, povinné celé kladné číslo

    type_name: Joi.string()
        .max(255)
        .required(), // Název typu závady, povinné, max. délka 255 znaků

    description: Joi.string()
        .max(1000) // Popis typu závady, max. 1000 znaků
        .optional(), // Volitelné
});

module.exports = defectTypeValidationSchema;
