const Joi = require('joi');

// Validation schema for defect creation and update
module.exports = Joi.object({
    vehicle_id: Joi.number().integer().required(), // Vehicle ID is required
    type_id: Joi.number().integer().required(), // Defect type ID is required
    defect_severity: Joi.string()
        .valid('Minor', 'Low', 'Medium', 'High', 'Critical')
        .required(), // Severity level validation
    defect_status: Joi.string()
        .valid('Reported', 'In Progress', 'Repaired', 'Closed', 'Deferred')
        .required(), // Status validation
    description: Joi.string().max(1000).optional(), // Optional description
    date_reported: Joi.date().required(), // Date reported is required
    repair_cost: Joi.number().precision(2).optional(), // Optional repair cost
    user_id: Joi.number().integer().required(), // User ID is required
});
