const auditService = require('../services/auditService');

const auditLogger = async (req, res, next) => {
    const { table, operation, recordId, performedBy } = req.body;

    try {
        await auditService.logAudit({
            table,
            operation,
            recordId,
            performedBy,
        });
        next();
    } catch (err) {
        console.error('Error in audit logger middleware:', err);
        res.status(500).send('Failed to log audit');
    }
};

module.exports = auditLogger;
