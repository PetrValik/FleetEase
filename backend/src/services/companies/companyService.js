const supabase = require('../../config/supabaseClient');
const CompanyModel = require('../../models/companies/companyModel');

// Fetch all companies
exports.getAllCompanies = async () => {
    const { data, error } = await supabase
        .from(CompanyModel.tableName)
        .select('*');
    if (error) {
        console.error('Error fetching companies:', error);
        throw new Error('Failed to fetch companies');
    }
    return data;
};

// Fetch a single company by ID
exports.getCompanyById = async (id) => {
    const { data, error } = await supabase
        .from(CompanyModel.tableName)
        .select('*')
        .eq(CompanyModel.fields.id, id)
        .single();
    if (error) {
        console.error('Error fetching company:', error);
        throw new Error('Failed to fetch company');
    }
    return data;
};

// Create a new company
exports.createCompany = async (company) => {
    const { data, error } = await supabase
        .from(CompanyModel.tableName)
        .insert(company);
    if (error) {
        console.error('Error creating company:', error);
        throw new Error('Failed to create company');
    }
    return data;
};

// Update an existing company
exports.updateCompany = async (id, updates) => {
    const { data, error } = await supabase
        .from(CompanyModel.tableName)
        .update(updates)
        .eq(CompanyModel.fields.id, id);
    if (error) {
        console.error('Error updating company:', error);
        throw new Error('Failed to update company');
    }
    return data;
};

// Delete a company
exports.deleteCompany = async (id) => {
    const { data, error } = await supabase
        .from(CompanyModel.tableName)
        .delete()
        .eq(CompanyModel.fields.id, id);
    if (error) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete company');
    }
    return data;
};
