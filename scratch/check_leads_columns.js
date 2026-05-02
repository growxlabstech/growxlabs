const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkColumns() {
  // Query a single row or just use an RPC/query to see columns
  const { data, error } = await supabase.from('leads').select('*').limit(1);
  if (error) {
    console.error('Error fetching leads:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Columns in leads table:', Object.keys(data[0]));
  } else {
    // If no data, try to insert a dummy and see error or fetch meta
    console.log('No data in leads table to check columns.');
    // Attempting a select with a non-existent column to see what happens is one way, 
    // but better to just use a query that returns columns.
    const { data: cols, error: colError } = await supabase.rpc('get_table_columns', { table_name: 'leads' });
    if (colError) {
        console.log('RPC failed, trying another way...');
        // Just try to fetch one row and see the object structure if it exists
    } else {
        console.log('Columns from RPC:', cols);
    }
  }
}

checkColumns();
