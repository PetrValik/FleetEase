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
