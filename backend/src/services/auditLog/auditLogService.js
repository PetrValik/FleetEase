const supabase = require('../../config/supabaseClient');

// Logování operace do audit logu
exports.logAudit = async ({ table, operation, recordId, performedBy }) => {
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
        throw new Error(`Failed to log audit: ${error.message}`);
    }
};

// Získání všech záznamů z audit logu
exports.fetchAuditLogs = async () => {
    const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch audit logs: ${error.message}`);
    }

    return data;
};
