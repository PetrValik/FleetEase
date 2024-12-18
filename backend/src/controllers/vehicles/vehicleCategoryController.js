const vehicleCategoryService = require('../../services/vehicles/vehicleCategoryService');

// Get all vehicle categories
exports.getAll = async (req, res) => {
    try {
        const categories = await vehicleCategoryService.getAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching vehicle categories:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle categories' });
    }
};

// Get one vehicle category by ID
exports.getById = async (req, res) => {
    try {
        const category = await vehicleCategoryService.getById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching vehicle category:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new vehicle category
exports.create = async (req, res) => {
    try {
        const category = await vehicleCategoryService.create(req.body);
        res.status(201).json({ message: 'Vehicle category created successfully', category });
    } catch (error) {
        console.error('Error creating vehicle category:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update a vehicle category
exports.update = async (req, res) => {
    try {
        const category = await vehicleCategoryService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Vehicle category updated successfully', category });
    } catch (error) {
        console.error('Error updating vehicle category:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle category
exports.delete = async (req, res) => {
    try {
        await vehicleCategoryService.delete(req.params.id);
        res.status(200).json({ message: 'Vehicle category deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle category:', error);
        res.status(400).json({ error: error.message });
    }
};
