import { createClient } from '@supabase/supabase-js';

// Public Supabase demo project for Christmas Tree
// This is a free public instance - for production, create your own Supabase project at supabase.com
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.demo-key-replace-with-real';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
