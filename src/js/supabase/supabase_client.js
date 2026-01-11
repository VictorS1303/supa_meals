import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_ANON_SUPABASE_KEY

if(!supabaseUrl || !supabaseKey)
{
    throw new Error('Supabase key or Supabase URL is missing. Check your .env file')
}

export const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey)