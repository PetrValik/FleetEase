const supabase = require('../../config/supabaseClient');

// Retrieve all authentication providers from the AuthProviders table
exports.getAllAuthProviders = async () => {
  const { data, error } = await supabase.from('AuthProviders').select('*'); // Select all columns from the AuthProviders table
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return the list of authentication providers
};

// Retrieve a specific authentication provider by its ID from the AuthProviders table
exports.getAuthProviderById = async (id) => {
  const { data, error } = await supabase
    .from('AuthProviders')
    .select('*') // Select all columns
    .eq('provider_id', id) // Filter by the provided provider ID
    .single(); // Expect a single record
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return the authentication provider data
};
