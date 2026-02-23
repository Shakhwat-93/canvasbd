import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ausrnwtbsboshajprwnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1c3Jud3Ric2Jvc2hhanByd25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NzU3NTQsImV4cCI6MjA4NzE1MTc1NH0.mCArzgj5JZApIl4VfW94pI2mq79Kuua23nMDbh0dIg0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLS() {
    const { data: insertData, error: insertError } = await supabase.from('contacts').insert([
        {
            name: 'Test2',
            email: 'test2@example.com',
            phone: '123456789',
            service: 'Service',
            message: 'Message'
        }
    ]);

    if (insertError) {
        console.error("INSERT ERROR:", insertError);
    } else {
        console.log("INSERT SUCCESS:", insertData);
    }
}

testRLS();
