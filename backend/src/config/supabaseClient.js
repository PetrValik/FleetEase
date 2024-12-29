const { createClient } = require('@supabase/supabase-js');

// Load Supabase URL and API key from `.env` file
const supabaseUrl = process.env.SUPABASE_URL; // Supabase project URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Supabase service role key

// Create a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; // Export the client for use in other modules
