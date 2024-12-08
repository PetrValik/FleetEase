const supabase = require('../../config/supabaseClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrace uživatele
exports.registerUser = async (user) => {
  const { email, password, first_name, last_name, roles_id, company_id } = user;

  // Zkontroluj, zda už uživatel existuje
  const { data: existingUser, error: checkError } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User already exists');
  }

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  // Hash hesla
  const hashedPassword = await bcrypt.hash(password, 10);

  // Ulož uživatele do databáze
  const { data, error } = await supabase.from('Users').insert({
    email,
    password_hash: hashedPassword,
    first_name,
    last_name,
    roles_id,
    company_id,
    created_at: new Date(),
    is_active: true,
  });

  if (error) throw error;
  return data;
};

// Přihlášení uživatele
exports.loginUser = async (email, password) => {
  const { data: user, error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user || error) {
    throw new Error('Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

// Získání všech uživatelů
exports.getAllUsers = async () => {
  const { data, error } = await supabase.from('Users').select('user_id, email, first_name, last_name, roles_id, company_id');
  if (error) throw error;
  return data;
};

// Získání jednoho uživatele podle ID
exports.getUserById = async (id) => {
  const { data, error } = await supabase
    .from('Users')
    .select('user_id, email, first_name, last_name, roles_id, company_id')
    .eq('user_id', id)
    .single();
  if (error) throw error;
  return data;
};
