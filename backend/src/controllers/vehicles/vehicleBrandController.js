const vehicleBrandService = require('../../services/vehicles/vehicleBrandService');

// Get all vehicle brands
exports.getAll = async (req, res) => {
    try {
        const brands = await vehicleBrandService.getAll();
        res.status(200).json(brands);
    } catch (error) {
        console.error('Error fetching vehicle brands:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle brands' });
    }
};

// Get one vehicle brand by ID
exports.getById = async (req, res) => {
    try {
        const brand = await vehicleBrandService.getById(req.params.id);
        res.status(200).json(brand);
    } catch (error) {
        console.error('Error fetching vehicle brand:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new vehicle brand
exports.create = async (req, res) => {
    try {
        const brand = await vehicleBrandService.create(req.body);
        res.status(201).json({ message: 'Vehicle brand created successfully', brand });
    } catch (error) {
        console.error('Error creating vehicle brand:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update a vehicle brand
exports.update = async (req, res) => {
    try {
        const brand = await vehicleBrandService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Vehicle brand updated successfully', brand });
    } catch (error) {
        console.error('Error updating vehicle brand:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle brand
exports.delete = async (req, res) => {
    try {
        await vehicleBrandService.delete(req.params.id);
        res.status(200).json({ message: 'Vehicle brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle brand:', error);
        res.status(400).json({ error: error.message });
    }
};
