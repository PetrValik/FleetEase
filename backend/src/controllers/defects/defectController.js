const defectService = require('../../services/defects/defectService');

// Get all defects
exports.getAllDefects = async (req, res) => {
    try {
        const defects = await defectService.getAllDefects();
        res.status(200).json(defects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch defects' });
    }
};

// Get defect by ID
exports.getDefectById = async (req, res) => {
    try {
        const defect = await defectService.getDefectById(req.params.id);
        res.status(200).json(defect);
    } catch (error) {
        res.status(404).json({ error: 'Defect not found' });
    }
};

// Create a new defect
exports.createDefect = async (req, res) => {
    try {
        // Ensure the defect type exists
        await defectService.validateDefectType(req.body.type_id);

        const newDefect = await defectService.createDefect(req.body);
        res.status(201).json({ message: 'Defect created successfully', defect: newDefect });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing defect
exports.updateDefect = async (req, res) => {
    try {
        // Validate defect type if provided
        if (req.body.type_id) {
            await defectService.validateDefectType(req.body.type_id);
        }

        const updatedDefect = await defectService.updateDefect(req.params.id, req.body);
        res.status(200).json({ message: 'Defect updated successfully', defect: updatedDefect });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a defect
exports.deleteDefect = async (req, res) => {
    try {
        await defectService.deleteDefect(req.params.id);
        res.status(200).json({ message: 'Defect deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete defect' });
    }
};

// Get defects by user ID
exports.getDefectsByUserId = async (req, res) => {
    try {
        const defects = await defectService.getDefectsByUserId(req.params.userId);
        res.status(200).json(defects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch defects for the user' });
    }
};

// Get defects by vehicle ID
exports.getDefectsByVehicleId = async (req, res) => {
    try {
        const defects = await defectService.getDefectsByVehicleId(req.params.vehicleId);
        res.status(200).json(defects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch defects for the vehicle' });
    }
};