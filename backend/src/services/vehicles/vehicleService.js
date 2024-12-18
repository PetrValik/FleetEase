const supabase = require('../../config/supabaseClient');
const VehicleModel = require('../../models/vehicles/vehicleModel');
const { tableName, fields } = VehicleModel;

// Get all vehicles
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch vehicles');
    return data;
};

// Get a single vehicle by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Vehicle not found');
    return data;
};

// Create a new vehicle
exports.create = async (vehicleData) => {
    const { data, error } = await supabase.from(tableName).insert([vehicleData]);
    if (error) throw new Error('Failed to create vehicle');
    return data;
};

// Update an existing vehicle
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update vehicle');
    return data;
};

// Delete a vehicle
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete vehicle');
};
