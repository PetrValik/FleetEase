const supabase = require('../../config/supabaseClient');

// Získání všech záznamů z userAuthProviders
exports.getAllUserAuthProviders = async () => {
  const { data, error } = await supabase.from('UserAuthProviders').select('*');
  if (error) throw error;
  return data;
};

// Získání jednoho záznamu podle ID
exports.getUserAuthProviderById = async (id) => {
  const { data, error } = await supabase
    .from('UserAuthProviders')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

// Vytvoření nového záznamu
exports.createUserAuthProvider = async (userAuthProvider) => {
  const { data, error } = await supabase.from('UserAuthProviders').insert(userAuthProvider).single();
  if (error) throw error;
  return data;
};
