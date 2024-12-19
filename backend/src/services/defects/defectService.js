const supabase = require('../../config/supabaseClient');
const DefectModel = require('../../models/defects/defectModel');

// Validate if defect type exists
exports.validateDefectType = async (typeId) => {
    const { data, error } = await supabase
        .from('defect_types')
        .select('id')
        .eq('id', typeId)
        .single();

    if (error || !data) {
        throw new Error('Defect type does not exist');
    }
};

// Get all defects
exports.getAllDefects = async () => {
    const { data, error } = await supabase.from(DefectModel.tableName).select('*');
    if (error) {
        console.error('Error fetching defects:', error);
        throw new Error('Failed to fetch defects');
    }
    return data;
};

// Get defect by ID
exports.getDefectById = async (id) => {
    const { data, error } = await supabase
        .from(DefectModel.tableName)
        .select('*')
        .eq('defect_id', id)
        .single();

    if (error || !data) {
        throw new Error('Defect not found');
    }
    return data;
};

// Create a new defect
exports.createDefect = async (defect) => {
    const { data, error } = await supabase.from(DefectModel.tableName).insert(defect);
    if (error) {
        throw new Error('Failed to create defect');
    }
    return data;
};

// Update an existing defect
exports.updateDefect = async (id, updates) => {
    const { data, error } = await supabase
        .from(DefectModel.tableName)
        .update(updates)
        .eq('defect_id', id);

    if (error) {
        throw new Error('Failed to update defect');
    }
    return data;
};

// Delete a defect
exports.deleteDefect = async (id) => {
    const { data, error } = await supabase
        .from(DefectModel.tableName)
        .delete()
        .eq('defect_id', id);

    if (error) {
        throw new Error('Failed to delete defect');
    }
    return data;
};
