const auditLogService = require('../../services/auditLog/auditLogService');

// Controller to fetch all audit logs
exports.getAllAuditLogs = async (req, res) => {
    try {
        const logs = await auditLogService.getAllLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error in getAllAuditLogs:', error);
        res.status(500).json({ error: 'Failed to retrieve audit logs' });
    }
};
