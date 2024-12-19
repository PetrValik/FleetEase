const vehicleModelService = require('../../services/vehicles/vehicleModelService');

// Get all vehicle models
exports.getAll = async (req, res) => {
    try {
        const models = await vehicleModelService.getAll();
        res.status(200).json(models);
    } catch (error) {
        console.error('Error fetching vehicle models:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle models' });
    }
};

// Get one vehicle model by ID
exports.getById = async (req, res) => {
    try {
        const model = await vehicleModelService.getById(req.params.id);
        res.status(200).json(model);
    } catch (error) {
        console.error('Error fetching vehicle model:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new vehicle model
exports.create = async (req, res) => {
    try {
        const model = await vehicleModelService.create(req.body);
        res.status(201).json({ message: 'Vehicle model created successfully', model });
    } catch (error) {
        console.error('Error creating vehicle model:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update a vehicle model
exports.update = async (req, res) => {
    try {
        const model = await vehicleModelService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Vehicle model updated successfully', model });
    } catch (error) {
        console.error('Error updating vehicle model:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle model
exports.delete = async (req, res) => {
    try {
        await vehicleModelService.delete(req.params.id);
        res.status(200).json({ message: 'Vehicle model deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle model:', error);
        res.status(400).json({ error: error.message });
    }
};
