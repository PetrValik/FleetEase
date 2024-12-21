const supabase = require('../config/supabaseClient');
const InsuranceCompanyModel = require('../models/insuranceCompanyModel');
const { tableName, fields } = InsuranceCompanyModel;

// Fetch all insurance companies
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch insurance companies');
    return data;
};

// Fetch one insurance company by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Insurance company not found');
    return data;
};

// Create a new insurance company
exports.create = async (companyData) => {
    const { data, error } = await supabase.from(tableName).insert([companyData]);
    if (error) throw new Error('Failed to create insurance company');
    return data;
};

// Update an insurance company
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update insurance company');
    return data;
};

// Delete an insurance company
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete insurance company');
};
