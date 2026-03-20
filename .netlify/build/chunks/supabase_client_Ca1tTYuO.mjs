import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = "https://halglxwfrzdhxcykzoys.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbGdseHdmcnpkaHhjeWt6b3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQzODcsImV4cCI6MjA4MDA2MDM4N30.3ctSex1wtjzMZd8ONt6m_-laif5Y6ZxWiKfT474_FkI";
const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey);

export { supabaseClient as s };
