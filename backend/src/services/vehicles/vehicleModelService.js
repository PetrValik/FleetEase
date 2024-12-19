const supabase = require('../../config/supabaseClient');
const VehicleModelModel = require('../../models/vehicles/vehicleModelModel');
const { tableName, fields } = VehicleModelModel;

// Fetch all vehicle models
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch vehicle models');
    return data;
};

// Fetch one vehicle model by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Vehicle model not found');
    return data;
};

// Create a new vehicle model
exports.create = async (modelData) => {
    const { data, error } = await supabase.from(tableName).insert([modelData]);
    if (error) throw new Error('Failed to create vehicle model');
    return data;
};

// Update a vehicle model
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update vehicle model');
    return data;
};

// Delete a vehicle model
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete vehicle model');
};

// Get vehicle models by brand ID
exports.getModelsByBrandId = async (brandId) => {
    try {
      const models = await db('VehicleModels')
        .select('*')
        .where({ brand_id: brandId });
  
      return models;
    } catch (error) {
      console.error('Error in vehicleModelsService:', error);
      throw new Error('Database query failed');
    }
  };