const supabase = require('../../config/supabaseClient');
const InsuranceCompanyModel = require('../../models/insurances/insuranceCompanyModel');

// Get all insurance companies
exports.getAll = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceCompanyModel.tableName)
            .select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch insurance companies:', error);
        res.status(500).json({ error: 'Failed to fetch insurance companies' });
    }
};

// Get one insurance company by ID
exports.getById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceCompanyModel.tableName)
            .select('*')
            .eq(InsuranceCompanyModel.fields.id, req.params.id)
            .single();

        if (error || !data) throw new Error('Insurance company not found');

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch insurance company:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new insurance company
exports.create = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceCompanyModel.tableName)
            .insert([req.body]);

        if (error) throw error;

        res.status(201).json({ message: 'Insurance company created successfully', company: data });
    } catch (error) {
        console.error('Failed to create insurance company:', error);
        res.status(400).json({ error: 'Failed to create insurance company' });
    }
};

// Update an insurance company
exports.update = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceCompanyModel.tableName)
            .update(req.body)
            .eq(InsuranceCompanyModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Insurance company updated successfully', company: data });
    } catch (error) {
        console.error('Failed to update insurance company:', error);
        res.status(400).json({ error: 'Failed to update insurance company' });
    }
};

// Delete an insurance company
exports.delete = async (req, res) => {
    try {
        const { error } = await supabase
            .from(InsuranceCompanyModel.tableName)
            .delete()
            .eq(InsuranceCompanyModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Insurance company deleted successfully' });
    } catch (error) {
        console.error('Failed to delete insurance company:', error);
        res.status(400).json({ error: 'Failed to delete insurance company' });
    }
};
