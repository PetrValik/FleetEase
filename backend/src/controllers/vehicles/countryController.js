const countryService = require('../../services/vehicles/countryService');

// Get all countries
exports.getAll = async (req, res) => {
    try {
        const countries = await countryService.getAll();
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
};

// Get one country by ID
exports.getById = async (req, res) => {
    try {
        const country = await countryService.getById(req.params.id);
        res.status(200).json(country);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new country
exports.create = async (req, res) => {
    try {
        const country = await countryService.create(req.body);
        res.status(201).json({ message: 'Country created successfully', country });
    } catch (error) {
        console.error('Error creating country:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update a country
exports.update = async (req, res) => {
    try {
        const country = await countryService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Country updated successfully', country });
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a country
exports.delete = async (req, res) => {
    try {
        await countryService.delete(req.params.id);
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(400).json({ error: error.message });
    }
};
