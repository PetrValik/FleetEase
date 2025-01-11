const reservationService = require('../../services/reservations/reservationService');

// Get all reservations
exports.getAll = async (req, res) => {
  try {
    const reservations = await reservationService.getAll();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching all reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

// Get one reservation by ID
exports.getById = async (req, res) => {
  try {
    const reservation = await reservationService.getById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error fetching reservation by ID:', error);
    res.status(404).json({ error: 'Reservation not found' });
  }
};

// Create a new reservation
// Create a new reservation only if the vehicle is not reserved
exports.create = async (req, res) => {
  try {
    const { vehicleId, start_time, end_time } = req.body;

    // Check if the vehicle is reserved
    const isReservedResult = await reservationService.isVehicleReserved(vehicleId, start_time, end_time);

    if (isReservedResult.isReserved) {
      return res.status(400).json({ error: 'The vehicle is already reserved for the selected time period' });
    }

    // Create the reservation
    const reservation = await reservationService.create(req.body);
    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update a reservation
exports.update = async (req, res) => {
  try {
    const reservation = await reservationService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a reservation
exports.delete = async (req, res) => {
  try {
    await reservationService.delete(req.params.id);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all reservations by vehicle ID
exports.getReservationsByVehicleId = async (req, res) => {
  try {
    const reservations = await reservationService.getReservationsByVehicleId(req.params.vehicle_id);
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations by vehicle ID:', error);
    res.status(500).json({ error: 'Failed to fetch reservations by vehicle ID' });
  }
};

// Get all vehicles with reservations by user ID
exports.getVehiclesWithReservationsByUserId = async (req, res) => {
  try {
    const vehicles = await reservationService.getVehiclesWithReservationsByUserId(req.params.userId);
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles with reservations by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles with reservations' });
  }
};

// Check if a specific vehicle has an active reservation
exports.checkVehicleActiveReservation = async (req, res) => {
  try {
    const reservation = await reservationService.checkVehicleActiveReservation(req.params.vehicleId);
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error checking vehicle active reservation:', error);
    res.status(500).json({ error: 'Failed to check vehicle reservation' });
  }
};

// Check if a specific vehicle is reserved
exports.isReserved = async (req, res) => {
  try {
    const result = await reservationService.isVehicleReserved(req.params.vehicleId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error checking if vehicle is reserved:', error);
    res.status(500).json({ error: 'Failed to check if vehicle is reserved' });
  }
};
