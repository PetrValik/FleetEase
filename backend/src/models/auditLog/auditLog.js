module.exports = {
    tableName: 'audit_logs',
    fields: {
        id: 'id',
        tableName: 'table_name',
        operation: 'operation',
        recordId: 'record_id',
        performedBy: 'performed_by',
        timestamp: 'timestamp',
    },
};
