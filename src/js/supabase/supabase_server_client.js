import { createServerClient, parseCookieHeader } from "@supabase/ssr"

export const createSupabaseServerClient = (cookies) =>
{
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.PUBLIC_ANON_SUPABASE_KEY

    const serverClient = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies:
            {
                get(key)
                {
                    return cookies.get(key)?.value
                },
                set(key, value, options)
                {
                    cookies.set(key, value, options)
                },
                remove(key, options)
                {
                    cookies.delete(key, options)
                }
            }
        }
    )

    return serverClient
}