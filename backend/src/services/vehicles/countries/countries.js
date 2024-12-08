const Joi = require('joi');

const countryValidationSchema = Joi.object({
    country_id: Joi.number()
        .integer()
        .positive()
        .required(), // ID země, povinné celé kladné číslo

    country_name: Joi.string()
        .max(255)
        .required(), // Název země, povinné, max. délka 255 znaků

    country_code2: Joi.string()
        .length(2) // ISO kód země (2 znaky)
        .uppercase() // Pouze velká písmena
        .required(), // Povinné

    country_code3: Joi.string()
        .length(3) // ISO kód země (3 znaky)
        .uppercase() // Pouze velká písmena
        .required(), // Povinné

    numeric: Joi.number()
        .integer()
        .positive()
        .required(), // Číselný kód země, povinné celé kladné číslo
});

module.exports = countryValidationSchema;
