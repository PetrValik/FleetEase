const supabase = require('../../config/supabaseClient');

// Získání všech rolí
exports.getAllRoles = async () => {
  const { data, error } = await supabase.from('Roles').select('*');
  if (error) throw error;
  return data;
};

// Získání role podle ID
exports.getRoleById = async (id) => {
  const { data, error } = await supabase.from('Roles').select('*').eq('role_id', id).single();
  if (error) throw error;
  return data;
};
