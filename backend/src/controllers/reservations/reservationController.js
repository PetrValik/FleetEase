const supabase = require('../../config/supabaseClient');
const ReservationModel = require('../../models/reservations/reservationModel');

// Get all reservations
exports.getAll = async (req, res) => {
    try {
        const { data, error } = await supabase.from(ReservationModel.tableName).select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

// Get one reservation by ID
exports.getById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(ReservationModel.tableName)
            .select('*')
            .eq(ReservationModel.fields.id, req.params.id)
            .single();

        if (error || !data) throw new Error('Reservation not found');

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch reservation:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new reservation
exports.create = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(ReservationModel.tableName)
            .insert([req.body]);
        if (error) throw error;

        res.status(201).json({ message: 'Reservation created successfully', reservation: data });
    } catch (error) {
        console.error('Failed to create reservation:', error);
        res.status(400).json({ error: 'Failed to create reservation' });
    }
};

// Update a reservation
exports.update = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(ReservationModel.tableName)
            .update(req.body)
            .eq(ReservationModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Reservation updated successfully', reservation: data });
    } catch (error) {
        console.error('Failed to update reservation:', error);
        res.status(400).json({ error: 'Failed to update reservation' });
    }
};

// Delete a reservation
exports.delete = async (req, res) => {
    try {
        const { error } = await supabase
            .from(ReservationModel.tableName)
            .delete()
            .eq(ReservationModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Failed to delete reservation:', error);
        res.status(400).json({ error: 'Failed to delete reservation' });
    }
};

// Get all reservations by vehicle ID
exports.getReservationsByVehicleId = async (req, res) => {
    try {
      const { vehicle_id } = req.params;
      const reservations = await reservationService.getReservationsByVehicleId(vehicle_id);
  
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({ error: 'No reservations found for the given vehicle ID' });
      }
  
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error fetching reservations by vehicle ID:', error);
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
  };

exports.getVehiclesWithReservationsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const reservations = await reservationService.getVehiclesWithReservationsByUserId(userId);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

exports.checkVehicleActiveReservation = async (req, res) => {
    try {
      const vehicleId = parseInt(req.params.vehicleId);
      const reservation = await reservationService.checkVehicleActiveReservation(vehicleId);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check vehicle reservation' });
    }
  };

  // Check if a specific vehicle is reserved
exports.isReserved = async (req, res) => {
    try {
      const { vehicleId } = req.params;
  
      const result = await reservationService.isVehicleReserved(vehicleId);
  
      // Respond with the result from the service
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in isReserved controller:', error);
      res.status(500).json({ error: 'Failed to check reservation status' });
    }
  };