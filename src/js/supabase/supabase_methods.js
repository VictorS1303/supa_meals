import { supabaseClient } from "./supabase_client"

// Initialize user
export const initializeAuth = async (onAuthChange) =>
{
    // Check initial auth state
    const {data: {user}} = await supabaseClient.auth.getUser()

    let isLoggedIn = !!user

   // Call the callback with initial state
   onAuthChange(isLoggedIn)

   supabaseClient.auth.onAuthStateChange((event, session) => {  // Fixed: onAuthStateChange
    isLoggedIn = !!session?.user
    console.log('Auth state changed: ', isLoggedIn)
    onAuthChange(isLoggedIn)
   })
}

// Sign in
export const signIn = async (email, password) =>
{
    const {data: signInData, error: signInError} = await supabaseClient
        .signInWithPassword(
            {
                email: email,
                password: password
            }
        )


    if(signInError)
    {
        console.log('Sign in error: ', signInError.hint, signInError.message)
    }
    else
    {
        console.log('Successfully signed in', signInData)
    }
}