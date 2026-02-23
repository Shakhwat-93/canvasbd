import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ausrnwtbsboshajprwnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1c3Jud3Ric2Jvc2hhanByd25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzU3NTQsImV4cCI6MjA4NzE1MTc1NH0.mCArzgj5JZApIl4VfW94pI2mq79Kuua23nMDbh0dIg0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase.from('contacts').select('*').limit(1);

    if (error) {
        console.error("ERROR:", error);
    } else {
        if (data.length > 0) {
            console.log("Columns:", Object.keys(data[0]));
        } else {
            console.log("No data to infer schema from.");
        }
    }
}

checkSchema();
