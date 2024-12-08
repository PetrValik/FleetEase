const supabase = require('../config/supabaseClient ');

const auditLogger = async (req, res, next) => {
    const { table, operation, recordId, performedBy } = req.body;

    try {
        const { error } = await supabase
            .from('audit_logs')
            .insert([
                {
                    table_name: table,
                    operation,
                    record_id: recordId,
                    performed_by: performedBy,
                },
            ]);

        if (error) {
            console.error('Error logging audit:', error);
            res.status(500).send('Failed to log audit');
        } else {
            next();
        }
    } catch (err) {
        console.error('Unexpected error in audit logger:', err);
        res.status(500).send('Audit logger error');
    }
};

module.exports = auditLogger;
