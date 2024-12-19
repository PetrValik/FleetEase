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
    const performedBy = req.user?.user_id || null; // Get the user ID from the token or null

    // Prepare the audit log entry
    const logEntry = {
      table_name: req.baseUrl.replace('/api/', ''), // Extract table name from base URL
      operation: operation,
      record_id: id || null,
      performed_by: performedBy,
    };

    // Log the entry to the AuditLog table
    const { data, error } = await supabase.from('AuditLogs').insert([logEntry]).select('*');

    if (error) {
      console.error('Failed to log audit:', error.message || error);
      return res.status(500).json({ error: 'Failed to log audit entry' });
    }

    console.log('Audit log successfully added:', data);
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error('Unexpected error in logAudit middleware:', err.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = logAudit;
