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

// Register and login
export const registerAndLogin = async (name, email, password, profileImage = null) =>
{
    // 1. Sign up user
    const {data: signUpUserData, error: signUpUserError} = await supabaseClient.auth.signUp({
        email,
        password,
        // Setting the username to be the user's actual name
        options: {data: {username: name}}
    })
    
    if(signUpUserError)
    {
        console.error('Sign-up error',  signUpUserError.hint, signUpUserError.message)
        return {success: false, signUpError: signUpUserError.message} // <- Also fixed 'error' to 'signUpUserError'
    }
    
    // 2. Force login if no session is returned
    let sessionUser

    // Check if session was created during sign up (email confirmation has been disabled)
    if(signUpUserData.session)
    {
        /*
            Session exists, and user is already logged in, why it is extracted from session
        */
        sessionUser = signUpUserData.session.user
    }
    else
    {
        /*
            No session is returned. E-mail confirmation is required, so the user is being manually logged in
        */
        const {data: loginData, error: loginError} = await supabaseClient.auth.signInWithPassword({email, password})


        // Check if login failed and return error
        if(loginError)
        {
            console.error('Login error: ', loginError.message)
            return {success: false, signUpError: loginError.message}
        }

        // Set user session to the data of the logged in user
        sessionUser = loginData.user
    }

    // 3. Upload avatar if provided
    let avatarUrl = null

    if(profileImage)
    {
        try
        {
            // Splitting the file name by the period before the extension and removes the extension
            const fileExtension = profileImage.name.split('.').pop()

            // Creating unique file name from user ID to prevent naming conflicts
            const fileName = `${sessionUser.id}/profile.${fileExtension}`

            // Upload image to Supabase storage
            const {error: uploadError} = await supabaseClient
                .storage
                .from('avatar_images')
                .upload(fileName, profileImage, {cacheControl: '3000', upsert: false})
            

            // If uploaded succesfully, get the public URL and update the user metadata
            if(!uploadError)
            {
                const {data: {publicUrl}} = await supabaseClient
                    .storage
                    .from('avatar_images')
                    .getPublicUrl(fileName)
                

                // Set the avatar URL to its public URL
                avatarUrl = publicUrl

                // Update user's metadata with avatar URL
                await supabaseClient.auth.updateUser({data: {avatar_url: avatarUrl}})
                
            }
        }
        catch(error)
        {
            // Log upload erros but don't fail registration
            console.error('Avatar upload error: ', error)
        }
    }
    

    // 4. Return user and avatar
    return {success: true, user: sessionUser, avatarUrl}
}

// Store user data in user table
export const storeUsersInUsersTable = async (name, email, password, profileImage) =>
{
    const {data: insertUserData, error: insertUserError} = await supabaseClient
    .from('users')
    .insert({
        user_name: name,
        user_email: email,
        user_password: password,
        user_profile_image: profileImage,        
    })

    if(insertUserError)
    {
        console.error(`Error inserting user: ${insertUserError.hint, insertUserError.message}`)
    }

    return insertUserData || []
}