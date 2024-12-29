const supabase = require('../../config/supabaseClient');

// Retrieve all roles from the Roles table
exports.getAllRoles = async () => {
  const { data, error } = await supabase.from('Roles').select('*'); // Select all columns from the Roles table
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return the list of roles
};

// Retrieve a specific role by its ID from the Roles table
exports.getRoleById = async (id) => {
  const { data, error } = await supabase
    .from('Roles')
    .select('*') // Select all columns
    .eq('role_id', id) // Filter by the provided role ID
    .single(); // Expect a single record
  if (error) throw error; // Throw an error if fetching fails
  return data; // Return the role data
};
