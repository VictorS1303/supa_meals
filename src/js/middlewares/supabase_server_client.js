import { createSupabaseServerClient } from "../supabase/supabase_server_client";

export const onRequest = async ({ cookies, locals}, next) =>
{
    const supabaseServerClient = createSupabaseServerClient(cookies)

    // Refresh session if needed
    const { data: { session } } = await supabaseServerClient.auth.getSession()

    locals.supabaseServerClient = supabaseServerClient
    locals.session = session

    return next()
}