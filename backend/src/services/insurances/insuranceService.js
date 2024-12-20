const supabase = require('../config/supabaseClient');
const InsuranceModel = require('../models/insuranceModel');
const { tableName } = InsuranceModel;

// Create Insurance Record
exports.create = async (insuranceData) => {
    const { data, error } = await supabase
        .from(tableName)
        .insert([insuranceData]);

    if (error) throw new Error(`Failed to create insurance record: ${error.message}`);
    return data;
};

// Get All Insurance Records
exports.getAll = async () => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) throw new Error(`Failed to retrieve insurance records: ${error.message}`);
    return data;
};

// Get Insurance Record by ID
exports.getById = async (insuranceId) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('insurance_id', insuranceId)
        .single();

    if (error) throw new Error(`Failed to retrieve insurance record: ${error.message}`);
    return data;
};

// Update Insurance Record
exports.update = async (insuranceId, updatedData) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updatedData)
        .eq('insurance_id', insuranceId);

    if (error) throw new Error(`Failed to update insurance record: ${error.message}`);
    return data;
};

// Delete Insurance Record
exports.delete = async (insuranceId) => {
    const { data, error } = await supabase
        .from(tableName)
        .delete()
        .eq('insurance_id', insuranceId);

    if (error) throw new Error(`Failed to delete insurance record: ${error.message}`);
    return data;
};

// Get insurances by type and company ID
exports.getInsurancesByTypeAndCompany = async (insuranceType, companyId) => {
    const { data, error } = await supabase
      .from('Insurances')
      .select('*')
      .eq('insurance_types', insuranceType)
      .eq('company_id', companyId);
  
    if (error) {
      console.error('Error fetching insurances:', error);
      throw new Error('Failed to fetch insurances');
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