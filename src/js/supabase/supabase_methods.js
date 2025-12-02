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

// Register and login
export const registerAndLogin = async (name, email, password, profileImage = null) => {
  // 1. Sign up user
  const { data: signUpUserData, error: signUpUserError } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { username: name } }
  });

  if (signUpUserError) {
    console.error("Sign-up error:", signUpUserError.message);
    return { success: false, signUpError: signUpUserError.message };
  }

  // 2. Force login if no session returned
  let sessionUser;
  if (signUpUserData.session) {
    sessionUser = signUpUserData.session.user;
  } else {
    const { data: loginData, error: loginError } =
      await supabaseClient.auth.signInWithPassword({ email, password });

    if (loginError) {
      console.error("Login error:", loginError.message);
      return { success: false, signUpError: loginError.message };
    }

    sessionUser = loginData.user;
  }

 // 3. Upload avatar if provided
let avatarUrl = null;

if (profileImage) {
  try {
    const fileExtension = profileImage.name.split(".").pop();
    const fileName = `${sessionUser.id}/profile.${fileExtension}`;

    const { error: uploadError } = await supabaseClient
      .storage
      .from("avatar_images")
      .upload(fileName, profileImage, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
    } else {
      const { data: { publicUrl } } = supabaseClient
        .storage
        .from("avatar_images")
        .getPublicUrl(fileName);

      avatarUrl = publicUrl;

      await supabaseClient.auth.updateUser({
        data: { avatar_url: avatarUrl }
      });

      // refresh user metadata
      const { data: { user: updatedUser } } = await supabaseClient.auth.getUser();
      sessionUser = updatedUser;
    }
  } catch (err) {
    console.error("Avatar upload error:", err);
  }
}

  // 4. Return consistent result
  return { success: true, user: sessionUser, avatarUrl };
}

// Sign in
export const signIn = async (email, password) =>
{
    const { data: signInData, error: signInError } = await supabaseClient.auth
        .signInWithPassword({
            email,
            password
        })

    if(signInError)
    {
        console.log('Sign in error: ', signInError.hint, signInError.message)
    }
    else
    {
        console.log('Successfully signed in', signInData)
    }
}

// Login
export const login = async (email, password) =>
{
  try
  {
    const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (loginError) 
  {
    console.error('Error logging in: ', loginError.message, loginError.hint);
    return { success: false, error: loginError.message };
  }

  if (!loginData.session) 
  {
    console.warn('No returned session after login - something is wrong');
    return { success: false, error: 'No returned session!' };
  }

  return { success: true, user: loginData.user, session: loginData.session };

}
    catch (err)
    {
      console.error('Unexpected error during login:', err);
      return { success: false, error: err.message || 'Unknown error' };
    }
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