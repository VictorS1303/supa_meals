import { createServerClient } from '@supabase/ssr';

const createSupabaseServerClient = (cookies) => {
  const supabaseUrl = "https://halglxwfrzdhxcykzoys.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbGdseHdmcnpkaHhjeWt6b3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQzODcsImV4cCI6MjA4MDA2MDM4N30.3ctSex1wtjzMZd8ONt6m_-laif5Y6ZxWiKfT474_FkI";
  const serverClient = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(key) {
          return cookies.get(key)?.value;
        },
        set(key, value, options) {
          cookies.set(key, value, options);
        },
        remove(key, options) {
          cookies.delete(key, options);
        }
      }
    }
  );
  return serverClient;
};

export { createSupabaseServerClient as c };
