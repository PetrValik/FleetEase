const supabase = require('../../config/supabaseClient');

// Získání všech poskytovatelů autentizace
exports.getAllAuthProviders = async () => {
  const { data, error } = await supabase.from('AuthProviders').select('*');
  if (error) throw error;
  return data;
};

// Získání jednoho poskytovatele autentizace podle ID
exports.getAuthProviderById = async (id) => {
  const { data, error } = await supabase.from('AuthProviders').select('*').eq('provider_id', id).single();
  if (error) throw error;
  return data;
};
