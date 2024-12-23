import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjuhhoerfuiddxdagrlc.supabase.co'; // Nahraď svým URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdWhob2VyZnVpZGR4ZGFncmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMzI0OTQsImV4cCI6MjA0NjgwODQ5NH0.HGGP70FxZH5GN9IgxO-5X7Ujkc10hah9SxN-5SW5thI'; // Použij Public Key

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
