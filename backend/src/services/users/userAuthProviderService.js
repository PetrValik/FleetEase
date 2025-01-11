const supabase = require('../../config/supabaseClient');

// Retrieve all records from the UserAuthProviders table
exports.getAllUserAuthProviders = async () => {
  const { data, error } = await supabase.from('UserAuthProviders').select('*');
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return all records
};

// Retrieve a single record by ID from the UserAuthProviders table
exports.getUserAuthProviderById = async (id) => {
  const { data, error } = await supabase
    .from('UserAuthProviders')
    .select('*') // Select all columns
    .eq('id', id) // Filter by the provided ID
    .single(); // Expect a single record
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return the record
};

// Create a new record in the UserAuthProviders table
exports.createUserAuthProvider = async (userAuthProvider) => {
  const { data, error } = await supabase
    .from('UserAuthProviders')
    .insert(userAuthProvider) // Insert the provided data
    .single(); // Expect a single record as the result
  if (error) throw error; // Throw an error if the insertion fails
  return data; // Return the created record
};
