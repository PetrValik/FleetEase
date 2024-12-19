const supabase = require('../../config/supabaseClient');
const CountryModel = require('../../models/vehicles/countryModel');
const { tableName, fields } = CountryModel;

// Fetch all countries
exports.getAll = async () => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw new Error('Failed to fetch countries');
    return data;
};

// Fetch one country by ID
exports.getById = async (id) => {
    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq(fields.id, id)
        .single();

    if (error || !data) throw new Error('Country not found');
    return data;
};

// Create a new country
exports.create = async (countryData) => {
    const { data, error } = await supabase.from(tableName).insert([countryData]);
    if (error) throw new Error('Failed to create country');
    return data;
};

// Update a country
exports.update = async (id, updates) => {
    const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq(fields.id, id);

    if (error) throw new Error('Failed to update country');
    return data;
};

// Delete a country
exports.delete = async (id) => {
    const { error } = await supabase.from(tableName).delete().eq(fields.id, id);
    if (error) throw new Error('Failed to delete country');
};
