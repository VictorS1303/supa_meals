import { supabaseClient } from "./supabase_client"
import { slugify } from "../utils/formatters"
import { fetchLikedMealData } from "../../js/supabase/supabase_methods"

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
export const likeMeal = async (userId, apiMealId) =>
{
  // Ensure meal does exist in database and get full meal info
  const meal = await fetchLikedMealData(apiMealId)
  
  const {data: likedMealData, error: likedMealError} = await supabaseClient
    .from('liked_meals')
    .insert({
      user_id: userId,
      api_meal_id: meal.api_meal_id,
      meal_name: meal.meal_name,
      meal_thumb: meal.meal_thumb,
    })
    .select()
    .single()

    if(likedMealError)
    {
      // Unique constraint violation
      if(likedMealError.code === '23505')
      {
        return {alreadyLiked: true} 
      }

      throw new Error(`Failed to like meal: ${likedMealError.message}`)
    }

    console.log("Meal liked:", likedMealData)

    return likedMealData
}



// export const likeMeal = async (userId, apiMealId) => {
//   // Get or insert meal into DB
//   const mealData = await fetchLikedMealData(apiMealId); // ✅ returns local DB row

//   const { data: likeMealData, error: likeMealError } = await supabaseClient
//     .from('liked_meals')
//     .insert({
//       user_id: userId,
//       meal_id: mealData.id,
//       meal_name: slugify(mealData.title),
//       meal_thumb: mealData.image_url, 
//       created_at: new Date().toISOString()
//     })
//     .select()
//     .single();

//   if (likeMealError) {
//     if (likeMealError.code === '23505') {
//       console.log('Meal already liked');
//       return { alreadyLiked: true };
//     }
//     throw new Error(`Failed to like meal: ${likeMealError.message}`);
//   }

//   return likeMealData;
// };

// Fetch liked meal data to store in database
import { fetchSingleMealById } from "../meal_fetching"

alData = async (apiMealId) =>
{
    const {data: likedMealExistingData, error: likedMealExistingError} = await supabaseClient
      .from('meals')
      .select('*')
      .eq('api_meal_id', apiMealId)
      .single()

    if(likedMealExistingError && likedMealExistingError.code !== 'PGRST116')
    {
      throw new Error(`Database error: ${likedMealExistingError.message}`)
    }

    if(likedMealExistingData)
    {
      return likedMealExistingData
    }

    // Fetch from API
    const mealApiData = await fetchSingleMealById(apiMealId)

    if(!mealApiData)
    {
      throw new Error(`Meal with API ID ${apiMealId} not found`)
    }

    // Meal Payload Object
    const mealPayloadObject =
    {
      api_meal_id: mealApiData.idMeal,
      meal_name: mealApiData.strMeal,
      meal_thumb: mealApiData.strMealThumb,
    }

    // Insert into database
    const {data: insertedMealData, error: insertedMealError} = await supabaseClient
      .from('meals')
      .insert(mealPayloadObject)
      .select()
      .single()

    if(insertedMealError)
    {
      throw new Error(`Failed to insert meal ${insertedMealError.message}`)
    }

    return insertedMealData
}

// Fetch liked meals
export const fetchLikedMealsData = async () =>
{
  const {data: {user}, error: userError} = await supabaseClient.auth.getUser()

  if(userError || !user)
  {
    console.log(`No logged in user or error fetch user: ${userError.hint, userError.message}`) 
    return []
  }

  // Fetch liked meals with meal details
  const {data: likedMealData, error: likedMealError} = await supabaseClient
    .from('liked_meals')
    .select('id, meal_id, meal_name, meal_thumb, created_at, user_id')
    .eq('user_id', user.id)

    if(likedMealError)
    {
      console.log(`Error fetching the liked meal: ${likedMealError.hint, likedMealError.message}`)
    }

    return likedMealData || []
}