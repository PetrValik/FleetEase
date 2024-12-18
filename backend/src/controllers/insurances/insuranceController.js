const supabase = require('../../config/supabaseClient');
const InsuranceModel = require('../../models/insurances/insuranceModel');

// Get all insurances
exports.getAll = async (req, res) => {
    try {
        const { data, error } = await supabase.from(InsuranceModel.tableName).select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch insurances:', error);
        res.status(500).json({ error: 'Failed to fetch insurances' });
    }
};

// Get one insurance by ID
exports.getById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceModel.tableName)
            .select('*')
            .eq(InsuranceModel.fields.id, req.params.id)
            .single();

        if (error || !data) throw new Error('Insurance not found');

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch insurance:', error);
        res.status(404).json({ error: error.message });
    }
};

// Create a new insurance
exports.create = async (req, res) => {
    try {
        const { data, error } = await supabase.from(InsuranceModel.tableName).insert([req.body]);
        if (error) throw error;

        res.status(201).json({ message: 'Insurance created successfully', insurance: data });
    } catch (error) {
        console.error('Failed to create insurance:', error);
        res.status(400).json({ error: 'Failed to create insurance' });
    }
};

// Update an insurance
exports.update = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(InsuranceModel.tableName)
            .update(req.body)
            .eq(InsuranceModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Insurance updated successfully', insurance: data });
    } catch (error) {
        console.error('Failed to update insurance:', error);
        res.status(400).json({ error: 'Failed to update insurance' });
    }
};

// Delete an insurance
exports.delete = async (req, res) => {
    try {
        const { error } = await supabase
            .from(InsuranceModel.tableName)
            .delete()
            .eq(InsuranceModel.fields.id, req.params.id);

        if (error) throw error;

        res.status(200).json({ message: 'Insurance deleted successfully' });
    } catch (error) {
        console.error('Failed to delete insurance:', error);
        res.status(400).json({ error: 'Failed to delete insurance' });
    }
};
