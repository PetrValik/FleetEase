const supabase = require('../../config/supabaseClient');
const DefectTypeModel = require('../../validationSchemas/defects/defectTypeValidationSchema');

// Get all defect types
exports.getAllDefectTypes = async () => {
    const { data, error } = await supabase.from(DefectTypeModel.tableName).select('*');
    if (error) {
        console.error('Error fetching defect types:', error);
        throw new Error('Failed to fetch defect types');
    }
    return data;
};

// Get a single defect type by ID
exports.getDefectTypeById = async (id) => {
    const { data, error } = await supabase
        .from(DefectTypeModel.tableName)
        .select('*')
        .eq(DefectTypeModel.fields.id, id)
        .single();
    if (error) {
        console.error('Error fetching defect type:', error);
        throw new Error('Failed to fetch defect type');
    }
    return data;
};

// Create a new defect type
exports.createDefectType = async (defectType) => {
    const { data, error } = await supabase.from(DefectTypeModel.tableName).insert(defectType);
    if (error) {
        console.error('Error creating defect type:', error);
        throw new Error('Failed to create defect type');
    }
    return data;
};

// Update an existing defect type
exports.updateDefectType = async (id, updates) => {
    const { data, error } = await supabase
        .from(DefectTypeModel.tableName)
        .update(updates)
        .eq(DefectTypeModel.fields.id, id);
    if (error) {
        console.error('Error updating defect type:', error);
        throw new Error('Failed to update defect type');
    }
    return data;
};

// Delete a defect type
exports.deleteDefectType = async (id) => {
    const { data, error } = await supabase
        .from(DefectTypeModel.tableName)
        .delete()
        .eq(DefectTypeModel.fields.id, id);
    if (error) {
        console.error('Error deleting defect type:', error);
        throw new Error('Failed to delete defect type');
    }
    return data;
};
