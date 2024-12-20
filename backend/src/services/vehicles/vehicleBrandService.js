const supabase = require('../../config/supabaseClient');
const VehicleBrandModel = require('../../models/vehicles/vehicleBrandModel');
const { tableName, fields } = VehicleBrandModel;

// Fetch all vehicle brands
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch vehicle brands');
    return data;
};

// Fetch one vehicle brand by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Vehicle brand not found');
    return data;
};

// Create a new vehicle brand
exports.create = async (brandData) => {
    const { data, error } = await supabase.from(tableName).insert([brandData]);
    if (error) throw new Error('Failed to create vehicle brand');
    return data;
};

// Update a vehicle brand
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update vehicle brand');
    return data;
};

// Delete a vehicle brand
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete vehicle brand');
};
