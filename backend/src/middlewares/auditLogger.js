const supabase = require('../config/supabaseClient');

const logAudit = async (req, res, next) => {
  try {
    // Map HTTP methods to corresponding operations
    const methodToOperation = {
      POST: 'CREATE',
      PUT: 'UPDATE',
      DELETE: 'DELETE',
    };

    // Determine the operation based on the HTTP method
    const operation = methodToOperation[req.method];
    if (!operation) return next(); // Skip logging if the operation is not defined

    const { id } = req.params; // Retrieve the record ID from request parameters
    const performedBy = req.user?.user_id || 'anonymous'; // Get the user ID from the token or use 'anonymous'

    // Prepare the audit log entry
    const logEntry = {
      table_name: req.baseUrl.replace('/api/', ''), // Extract table name from the base URL (e.g., '/api/users' -> 'users')
      operation,
      record_id: id || null, // Use the record ID if available
      performed_by: performedBy, // User performing the operation
      timestamp: new Date().toISOString(), // Current timestamp
    };

    // Insert the audit log entry into the AuditLog table
    const { error } = await supabase.from('AuditLog').insert([logEntry]);

    if (error) {
      console.error('Failed to log audit:', error);
    }

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error('Unexpected error in logAudit middleware:', err);
    next(); // Continue even if an error occurs
  }
};

module.exports = logAudit;
