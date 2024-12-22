const defectTypeService = require('../../services/defects/defectTypeService');

// Get all defect types
exports.getAllDefectTypes = async (req, res) => {
    try {
        const defectTypes = await defectTypeService.getAllDefectTypes();
        res.status(200).json(defectTypes);
    } catch (error) {
        console.error('Error in getAllDefectTypes:', error);
        res.status(500).json({ error: 'Failed to fetch defect types' });
    }
};

// Get a defect type by ID
exports.getDefectTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const defectType = await defectTypeService.getDefectTypeById(id);
        res.status(200).json(defectType);
    } catch (error) {
        console.error('Error in getDefectTypeById:', error);
        res.status(500).json({ error: 'Failed to fetch defect type' });
    }
};

// Create a new defect type
exports.createDefectType = async (req, res) => {
    try {
        const defectType = await defectTypeService.createDefectType(req.body);
        res.status(201).json({ message: 'Defect type created successfully', defectType });
    } catch (error) {
        console.error('Error in createDefectType:', error);
        res.status(500).json({ error: 'Failed to create defect type' });
    }
};

// Update a defect type
exports.updateDefectType = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const defectType = await defectTypeService.updateDefectType(id, updates);
        res.status(200).json({ message: 'Defect type updated successfully', defectType });
    } catch (error) {
        console.error('Error in updateDefectType:', error);
        res.status(500).json({ error: 'Failed to update defect type' });
    }
};

// Delete a defect type
exports.deleteDefectType = async (req, res) => {
    try {
        const { id } = req.params;
        await defectTypeService.deleteDefectType(id);
        res.status(200).json({ message: 'Defect type deleted successfully' });
    } catch (error) {
        console.error('Error in deleteDefectType:', error);
        res.status(500).json({ error: 'Failed to delete defect type' });
    }
};
