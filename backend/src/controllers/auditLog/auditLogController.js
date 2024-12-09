const auditService = require('../../services/auditLog/auditLogService');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await auditService.fetchAuditLogs();
        res.status(200).json(logs);
    } catch (err) {
        console.error('Error fetching audit logs:', err);
        res.status(500).send('Failed to fetch audit logs');
    }
};
