const { createClient } = require('@supabase/supabase-js');

// Načtení URL a API klíče z `.env`
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Vytvoření Supabase klienta
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
