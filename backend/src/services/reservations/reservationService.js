const supabase = require('../config/supabaseClient');
const ReservationModel = require('../models/reservationModel');
const { tableName, fields } = ReservationModel;

// Fetch all reservations
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch reservations');
    return data;
};

// Fetch one reservation by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Reservation not found');
    return data;
};

// Create a new reservation
exports.create = async (reservationData) => {
    const { data, error } = await supabase.from(tableName).insert([reservationData]);
    if (error) throw new Error('Failed to create reservation');
    return data;
};

// Update a reservation
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update reservation');
    return data;
};

// Delete a reservation
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete reservation');
};

// Get all reservations by vehicle ID
exports.getReservationsByVehicleId = async (vehicle_id) => {
  const { data, error } = await supabase
    .from('Reservations')
    .select('*')
    .eq('vehicle_id', vehicle_id);

  if (error) {
    console.error('Error fetching reservations from the database:', error);
    throw new Error('Database query failed');
  }

  return data;
};

// Get vehicles with reservations by user ID
exports.getVehiclesWithReservationsByUserId = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('Reservations')
        .select(`
          reservation_id,
          vehicle_id,
          start_time,
          end_time,
          pickup_location,
          return_location,
          notes,
          created_at,
          Vehicles (
            vehicle_id,
            registration_number,
            vin,
            category_id,
            company_id
          )
        `)
        .eq('user_id', userId)
        .gte('end_time', new Date().toISOString()) // Filter active reservations (end time in the future)
        .order('start_time', { ascending: true });
  
      if (error) {
        console.error('Error fetching reservations by user ID:', error);
        throw new Error('Failed to fetch reservations');
      }
  
      return data || [];
    } catch (error) {
      console.error('Unexpected error:', error);
      throw new Error('Failed to fetch reservations');
    }
  };

  // Check if a vehicle has an active reservation
exports.checkVehicleActiveReservation = async (vehicleId) => {
    try {
      const { data, error } = await supabase
        .from('Reservations')
        .select('reservation_id, user_id, start_time, end_time, pickup_location, return_location')
        .eq('vehicle_id', vehicleId)
        .gte('end_time', new Date().toISOString()) // Filter for active reservations
        .single(); // Expect a single active reservation
  
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking vehicle active reservation:', error);
        throw new Error('Failed to check vehicle reservation');
      }
  
      return data || null; // Return the reservation details or null if none exists
    } catch (error) {
      console.error('Unexpected error:', error);
      throw new Error('Failed to check vehicle reservation');
    }
  };

  // Check if a specific vehicle is reserved
exports.isVehicleReserved = async (vehicleId) => {
    try {
      const { data, error } = await supabase
        .from('Reservations')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .eq('status', 'Active') // Assuming 'Active' indicates active reservation
        .single(); // Expecting one active reservation at a time
  
      if (error) {
        // No active reservation found
        if (error.code === 'PGRST116') {
          return { isReserved: false, reservation: null };
        }
        throw error;
      }
  
      // Active reservation found
      return { isReserved: true, reservation: data };
    } catch (error) {
      console.error('Error in isVehicleReserved service:', error);
      throw new Error('Failed to check if vehicle is reserved');
    }
  };