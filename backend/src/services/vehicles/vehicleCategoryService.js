const supabase = require('../../config/supabaseClient');
const VehicleCategoryModel = require('../../models/vehicles/vehicleCategoryModel');
const { tableName, fields } = VehicleCategoryModel;

// Fetch all vehicle categories
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch vehicle categories');
    return data;
};

// Fetch one vehicle category by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Vehicle category not found');
    return data;
};

// Create a new vehicle category
exports.create = async (categoryData) => {
    const { data, error } = await supabase.from(tableName).insert([categoryData]);
    if (error) throw new Error('Failed to create vehicle category');
    return data;
};

// Update a vehicle category
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update vehicle category');
    return data;
};

// Delete a vehicle category
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete vehicle category');
};
