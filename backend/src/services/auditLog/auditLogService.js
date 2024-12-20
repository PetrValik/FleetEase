const supabase = require('../../config/supabaseClient');
const AuditLogModel = require('../../models/auditLog/auditLogModel');

exports.getAllLogs = async () => {
    const { data, error } = await supabase
        .from(AuditLogModel.tableName)
        .select('*')
        .order(AuditLogModel.fields.timestamp, { ascending: false }); // Sort by most recent

    if (error) {
        console.error('Error fetching audit logs:', error);
        throw new Error('Failed to fetch audit logs');
    }

    return data;
};
