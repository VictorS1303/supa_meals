import { createSupabaseServerClient } from "./js/supabase/supabase_server_client.js"

export const onRequest = async ({ cookies, locals }, next) => {
  console.log("🔧 MIDDLEWARE RUNNING")
  
  const supabaseServerClient = createSupabaseServerClient(cookies)
  const { data: { session } } = await supabaseServerClient.auth.getSession()
  
  console.log("Session in middleware:", session?.user?.id)
  
  locals.supabaseServerClient = supabaseServerClient
  locals.session = session
  
  return next()
}