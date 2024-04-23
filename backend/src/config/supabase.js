const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
function createSupabaseClient(maxAttempts = 5) {
  let attempts = 0;
  let client;
  let url = process.env.SUPABASE_URL
  let key = process.env.SUPABASE_ANON_KEY

  while (attempts < maxAttempts) {
    try {
      client = createClient(url, key);
      // You might want to add some logic here to verify the client is working as expected
      return client;
    } catch (error) {
      console.error('Error creating Supabase client: ', error);
      attempts++;
    }
  }

  throw new Error('Failed to create Supabase client after ' + maxAttempts + ' attempts');
}
module.exports = createSupabaseClient()