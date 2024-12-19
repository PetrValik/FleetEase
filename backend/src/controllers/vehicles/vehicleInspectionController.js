const vehicleInspectionService = require('../../services/vehicles/vehicleInspectionService');

// Get all vehicle inspections
exports.getAll = async (req, res) => {
    try {
        const inspections = await vehicleInspectionService.getAll();
        res.status(200).json(inspections);
    } catch (error) {
        console.error('Error fetching vehicle inspections:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle inspections' });
    }
};

// Get a single inspection by ID
exports.getById = async (req, res) => {
    try {
        const inspection = await vehicleInspectionService.getById(req.params.id);
        res.status(200).json(inspection);
    } catch (error) {
        console.error('Error fetching vehicle inspection:', error);
        res.status(404).json({ error: 'Vehicle inspection not found' });
    }
};

// Create a new vehicle inspection
exports.create = async (req, res) => {
    try {
        const inspection = await vehicleInspectionService.create(req.body);
        res.status(201).json({ message: 'Vehicle inspection created successfully', inspection });
    } catch (error) {
        console.error('Error creating vehicle inspection:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update a vehicle inspection
exports.update = async (req, res) => {
    try {
        const inspection = await vehicleInspectionService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Vehicle inspection updated successfully', inspection });
    } catch (error) {
        console.error('Error updating vehicle inspection:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle inspection
exports.delete = async (req, res) => {
    try {
        await vehicleInspectionService.delete(req.params.id);
        res.status(200).json({ message: 'Vehicle inspection deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle inspection:', error);
        res.status(400).json({ error: error.message });
    }
};
