const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    // Validate the request body against the provided schema
    const { error } = schema.validate(req.body);

    // If validation fails, respond with a 400 status and the error message
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next(); // Proceed to the next middleware or route handler
  };
};

module.exports = validate;
