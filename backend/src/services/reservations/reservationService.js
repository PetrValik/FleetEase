const supabase = require('../../config/supabaseClient');
const ReservationModel = require('../../models/reservations/reservationModel');
const { tableName, fields } = ReservationModel;

// Fetch all reservations
exports.getAll = async () => {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error('Error fetching all reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
  return data;
};

// Fetch one reservation by ID
exports.getById = async (id) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(fields.id, id)
    .single();

  if (error) {
    console.error('Error fetching reservation by ID:', error);
    throw new Error('Reservation not found');
  }
  return data;
};

// Create a new reservation
exports.create = async (reservationData) => {
  const { data, error } = await supabase.from(tableName).insert([reservationData]);
  if (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
  return data;
};

// Update a reservation
exports.update = async (id, updates) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq(fields.id, id);

  if (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation');
  }
  return data;
};

// Delete a reservation
exports.delete = async (id) => {
  const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
  if (error) {
    console.error('Error deleting reservation:', error);
    throw new Error('Failed to delete reservation');
  }
};

// Get all reservations by vehicle ID
exports.getReservationsByVehicleId = async (vehicle_id) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(fields.vehicleId, vehicle_id);

  if (error) {
    console.error('Error fetching reservations by vehicle ID:', error);
    throw new Error('Failed to fetch reservations');
  }

  return data;
};

// Get vehicles with reservations by user ID
exports.getVehiclesWithReservationsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select(`
      reservation_id,
      vehicle_id,
      start_time,
      end_time,
      pickup_location,
      return_location,
      notes,
      created_at,
      vehicle_id
    `)
    .eq(fields.userId, userId)
    .gte(fields.endTime, new Date().toISOString()) // Active reservations
    .order(fields.startTime, { ascending: true });

  if (error) {
    console.error('Error fetching reservations by user ID:', error);
    throw new Error('Failed to fetch reservations');
  }

  return data || [];
};

// Check if a vehicle has an active reservation
exports.checkVehicleActiveReservation = async (vehicleId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select(`
      reservation_id,
      user_id,
      start_time,
      end_time,
      pickup_location,
      return_location
    `)
    .eq(fields.vehicleId, vehicleId)
    .gte(fields.endTime, new Date().toISOString()) // Active reservations
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking vehicle active reservation:', error);
    throw new Error('Failed to check vehicle reservation');
  }

  return data || null;
};

// Check if a specific vehicle is reserved
exports.isVehicleReserved = async (vehicleId) => {
  try {
    const currentTime = new Date().toISOString();

    const { data, error } = await supabase
      .from('Reservations') // Replace with your actual table name
      .select('*')
      .eq('vehicle_id', vehicleId)
      .gte('end_time', currentTime) // Ensure the reservation has not ended
      .lte('start_time', currentTime) // Ensure the reservation has started
      .single(); // Expect a single reservation to be active at any given time

    if (error) {
      if (error.code === 'PGRST116') {
        // No active reservation
        return { isReserved: false, reservation: null };
      }
      console.error('Error in isVehicleReserved service:', error);
      throw new Error('Failed to check if vehicle is reserved');
    }

    // Active reservation found
    return { isReserved: true, reservation: data };
  } catch (error) {
    console.error('Unexpected error in isVehicleReserved service:', error);
    throw new Error('Failed to check if vehicle is reserved');
  }
};
