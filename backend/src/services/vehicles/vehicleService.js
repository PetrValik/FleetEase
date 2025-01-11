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
    const { data, error } = await supabase.from(tableName).insert([vehicleData]).select('*'); // Use .select('*') to return the inserted record
    if (error) throw new Error('Failed to create vehicle');
    return data[0]; // Return the first record if insertion is successful
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

// Get vehicles by company ID
exports.getVehiclesByCompanyId = async (companyId) => {
  try {
    const { data, error } = await supabase
      .from('Vehicles') // Replace with your actual table name
      .select('*') // Adjust fields to fetch specific columns if needed
      .eq('company_id', companyId); // Filter by company ID

    if (error) {
      console.error('Error fetching vehicles by company ID:', error);
      throw new Error('Failed to fetch vehicles by company ID');
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching vehicles by company ID:', error);
    throw new Error('Failed to fetch vehicles');
  }
};