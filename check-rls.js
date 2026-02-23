import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ausrnwtbsboshajprwnh.supabase.co';
// We need the service role key to bypass RLS and query pg_policies or to fix it...
// Wait, we only have the anon key.
console.log("anon key:", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1c3Jud3Ric2Jvc2hhanByd25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzU3NTQsImV4cCI6MjA4NzE1MTc1NH0.mCArzgj5JZApIl4VfW94pI2mq79Kuua23nMDbh0dIg0');
