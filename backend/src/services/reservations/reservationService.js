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
