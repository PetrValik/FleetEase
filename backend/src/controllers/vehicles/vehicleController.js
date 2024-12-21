const vehicleService = require('../../services/vehicles/vehicleService');

// Get all vehicles
exports.getAll = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAll();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
};

// Get a single vehicle by ID
exports.getById = async (req, res) => {
    try {
        const vehicle = await vehicleService.getById(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(404).json({ error: 'Vehicle not found' });
    }
};

// Create a new vehicle
exports.create = async (req, res) => {
    try {
      const vehicle = await vehicleService.create(req.body);
      res.status(201).json(vehicle); // Return the created vehicle object directly
    } catch (error) {
      console.error('Error creating vehicle:', error);
      res.status(400).json({ error: error.message });
    }
  };

// Update a vehicle
exports.update = async (req, res) => {
    try {
        const vehicle = await vehicleService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a vehicle
exports.delete = async (req, res) => {
    try {
        await vehicleService.delete(req.params.id);
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getVehiclesByCompanyId = async (req, res) => {
    try {
      const { companyId } = req.params;
      const vehicles = await vehicleService.getVehiclesByCompanyId(companyId);
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles by company ID:', error);
      res.status(500).json({ error: 'Failed to fetch vehicles by company ID' });
    }
  };