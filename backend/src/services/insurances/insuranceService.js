const supabase = require('../../config/supabaseClient');
const InsuranceModel = require('../../models/insurances/insuranceModel');
const { tableName } = InsuranceModel;

// Create a new insurance record
exports.create = async (insuranceData) => {
  const { data, error } = await supabase.from(tableName).insert([insuranceData]);

  if (error) throw new Error(`Failed to create insurance record: ${error.message}`);
  return data;
};

// Get all insurance records
exports.getAll = async () => {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) throw new Error(`Failed to retrieve insurance records: ${error.message}`);
  return data;
};

// Get a single insurance record by ID
exports.getById = async (insuranceId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('insurance_id', insuranceId)
    .single();

  if (error) throw new Error(`Failed to retrieve insurance record: ${error.message}`);
  return data;
};

// Update an insurance record
exports.update = async (insuranceId, updatedData) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(updatedData)
    .eq('insurance_id', insuranceId);

  if (error) throw new Error(`Failed to update insurance record: ${error.message}`);
  return data;
};

// Delete an insurance record
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

  return data || [];
};

// Get insurances by company ID
exports.getInsurancesByCompany = async (companyId) => {
  const { data, error } = await supabase
    .from('Insurances')
    .select('*')
    .eq('company_id', companyId);

  if (error) {
    console.error('Error fetching insurances:', error);
    throw new Error('Failed to fetch insurances');
  }

  return data || []; // Return an empty array if no data is found
};
