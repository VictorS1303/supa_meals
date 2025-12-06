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

// Sign Out
export const signOutUser = async () =>
{
  await supabaseClient.auth.signOut()
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

// Like meal
export const likeMeal = async (userId, mealId) =>
{
    console.log('Create relationship: ', { userId, mealId })

    const {data: likeMealData, error: likeMealError} = await supabaseClient
    .from('liked_meals')
    .insert({
        user_id: userId,
        meal_id: mealId,
        created_at: new Date().toISOString()
    })
    .select()
    .single()

    if(likeMealError)
    {
      // Handle duplicate likes
      if(likeMealError.code === '23505')
      {
        console.log('Meal already liked')
        return {alreadyLiked: true}
      }
      throw new Error(`Failed to like meal: ${likeMealError.message}`)
    }

    console.log('Like inserted: ', likeMealData)
    return likeMealData
}

// Fetch liked meal data to store in database
import { fetchSingleMealById } from "../meal_fetching"

export const fetchLikedMealData = async (apiMealId) => {
  console.log("fetchLikedMealData called with ID:", apiMealId)  // Changed id to apiMealId
  
  const { data: existingMealData, error: existingMealError } = await supabaseClient
    .from('meals')
    .select('*')
    .eq('api_meal_id', apiMealId)
    .single();

  console.log("Existing meal data:", existingMealData)
  console.log("Existing meal error:", existingMealError)
  
  // If meal exists, return it
  if (existingMealError && existingMealError.code !== 'PGRST116') {
    throw new Error(`Database error: ${existingMealError.message}`)  // Fixed template literal
  }
  
  if (existingMealData) {
    console.log("Meal found in database, returning it")
    return existingMealData
  }
  
  console.log("Meal not found in database, fetching from API...")
  
  // If meal doesn't exist, fetch it from the API
  const mealFromAPI = await fetchSingleMealById(apiMealId)
  
  console.log("Meal from API:", mealFromAPI)
  
  if (!mealFromAPI) {
    throw new Error(`Meal with ID ${apiMealId} not found in the API`)  // Fixed template literal
  }
  
  console.log("Inserting meal into database...")
  
  // Insert meal into database
  const { data: insertedMealData, error: insertedMealError } = await supabaseClient
    .from('meals')
    .insert({
      api_meal_id: mealFromAPI.idMeal,
      title: mealFromAPI.strMeal,
      image_url: mealFromAPI.strMealThumb,
      created_at: new Date().toISOString()
    })
    .select()
    .single()
    
  console.log("Inserted meal data:", insertedMealData)
  console.log("Insert error:", insertedMealError)
    
  if (insertedMealError) {  // Changed insertMealError to insertedMealError
    throw new Error(`Failed to insert meal: ${insertedMealError.message}`)  // Fixed template literal and variable name
  }
  
  return insertedMealData
}