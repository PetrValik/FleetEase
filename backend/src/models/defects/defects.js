const Joi = require('joi');

const defectValidationSchema = Joi.object({
    defect_id: Joi.number()
        .integer()
        .positive()
        .required(), // ID závady, povinné celé kladné číslo

    created_at: Joi.date()
        .iso()
        .required(), // Datum vytvoření, povinné a musí být ve formátu ISO

    vehicle_id: Joi.number()
        .integer()
        .positive()
        .required(), // ID vozidla, povinné celé kladné číslo

    defect_severity: Joi.string()
        .valid('low', 'medium', 'high', 'critical') // Hodnoty dle ENUM z databáze
        .required(), // Úroveň závažnosti, povinné

    type_id: Joi.number()
        .integer()
        .positive()
        .required(), // Typ závady, povinné celé kladné číslo

    description: Joi.string()
        .max(500) // Popis závady, max. 500 znaků
        .optional(), // Volitelné

    date_reported: Joi.date()
        .iso()
        .required(), // Datum nahlášení, povinné a ve formátu ISO

    defect_status: Joi.string()
        .valid('open', 'in_progress', 'resolved', 'closed') // Hodnoty dle ENUM z databáze
        .required(), // Stav závady, povinné

    repair_cost: Joi.number()
        .precision(2) // Maximálně 2 desetinná místa
        .positive()
        .optional(), // Náklady na opravu, volitelné

    user_id: Joi.number()
        .integer()
        .positive()
        .required(), // ID uživatele, povinné celé kladné číslo
});

module.exports = defectValidationSchema;
