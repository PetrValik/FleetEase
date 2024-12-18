const supabase = require('../../config/supabaseClient');
const VehicleInspectionModel = require('../../models/vehicles/vehicleInspectionModel');
const { tableName, fields } = VehicleInspectionModel;

// Get all vehicle inspections
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch vehicle inspections');
    return data;
};

// Get a single vehicle inspection by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Vehicle inspection not found');
    return data;
};

// Create a new vehicle inspection
exports.create = async (inspectionData) => {
    const { data, error } = await supabase.from(tableName).insert([inspectionData]);
    if (error) throw new Error('Failed to create vehicle inspection');
    return data;
};

// Update an existing vehicle inspection
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update vehicle inspection');
    return data;
};

// Delete a vehicle inspection
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete vehicle inspection');
};
