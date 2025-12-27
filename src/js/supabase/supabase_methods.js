import { supabaseClient } from "./supabase_client"
import { slugify } from "../utils/formatters"

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
export const storeUsersInUsersTable = async (name, email, profileImage) => {
  // Get current session
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session?.user?.id) throw new Error("Cannot determine logged-in user ID");

  const userId = session.user.id;

  // Insert user into table using Auth ID
  const { data: insertUserData, error: insertUserError } = await supabaseClient
    .from('users')
    .upsert({
      id: userId,             // ✅ Must match Auth user ID
      user_name: name,
      user_email: email,
      user_profile_image: profileImage
    }, { onConflict: 'id' }) // avoids duplicates if user already exists
    .select()
    .single();

  if (insertUserError) {
    console.error(`Error inserting/updating user: ${insertUserError.message}`);
    throw insertUserError;
  }

  return insertUserData;
};
// Like meal
export const likeMeal = async (userId, apiMealId) => {
  if (!userId)
  {
    throw new Error("User ID is required");
  }
  
  if (!apiMealId)
  {
    throw new Error("Meal API ID is required");
  }

  // Check user exists in users table
  const { data: existingUser } = await supabaseClient
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (!existingUser) throw new Error("User does not exist in users table");

  // Ensure meal exists in database
  const meal = await fetchLikedMealData(apiMealId);
  if (!meal?.id)
  {
    throw new Error("Meal not found in database")
  }

  const { data: likedMealData, error: likedMealError } = await supabaseClient
    .from("liked_meals")
    .insert({
      user_id: userId,
      meal_id: meal.id,
      api_meal_id: meal.api_meal_id,
      meal_name: meal.meal_name,
      meal_thumb: meal.meal_thumb,
    })
    .select()
    .single();

  if (likedMealError) {
    if (likedMealError.code === "23505")
    {
      return { alreadyLiked: true }
    }
    
    throw new Error(`Failed to like meal: ${likedMealError.message}`);
  }

  return likedMealData;
};




// Fetch liked meal data to store in database
import { fetchSingleMealById } from "../meal_fetching"
export const fetchLikedMealData = async (apiMealId) =>
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

export const fetchLikedMealsData = async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();

  console.log(session)

  if (!session?.user)
  {
    return []
  }

  const userId = session.user.id;

  const { data, error } = await supabaseClient
    .from("liked_meals")
    .select("id, api_meal_id, meal_name, meal_thumb, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching liked meals:", error);
    return [];
  }
  
  return data || [];
}

// Dislike Meal
export const dislikeMeal = async (dislikeMealId) =>
{
  const {data: dislikeMealData, error: dislikeMealError} = await supabaseClient
    .from('liked_meals')
    .delete()
    .eq('api_meal_id', dislikeMealId)

  if(dislikeMealError)
  {
    console.log(`Error disliking meal: ${dislikeMealError.message}`)
  }

  return dislikeMealData
}

// Comment Meal
export const commentMeal = async (mealId, commentData) => {
  const { data: { session } } = await supabaseClient.auth.getSession()
  const user = session?.user

  if (!user) {
    throw new Error('User not authenticated')
  }

  const insertCommentData = {
    meal_id: mealId,
    user_id: user.id,
    title: commentData.title,
    body: commentData.body,
    rating: commentData.rating,
  }

  const { data, error } = await supabaseClient
    .from('comments')
    .insert(insertCommentData)
    .select()
    .single()

  if (error) {
    console.error('Failed to insert comment: ', error)
    throw error
  }

  return data
}

// Get Meal Primary Key
export const getMelPrimaryKeyByApiId = async (apiMealId) =>
{
    const {data, error} = await supabaseClient
      .from('meals')
      .select('id')
      .eq('api_meal_id', apiMealId)
      .single()
  

    if (error || !data) {
      throw new Error(`Meal with api_meal_id ${apiMealId} not found`)
    }

    return data.id
}

// Resolve api_meal_id to internal meal id
export const resolveApiMealIdToInternalMealId = async (apiMealId) =>
{
    if(!apiMealId)
    {
      throw new Error("API meal ID is required")
    }

    const { data: mealData, error: mealError } = await supabaseClient
      .from("meals")
      .select("id")
      .eq("api_meal_id", apiMealId)
      .single()

    if (!mealData || mealError) {
      console.error("No meal found for api_meal_id: ", apiMealId)
      alert("Cannot submit comment: Meal not found!")
      return
    }

    return mealData.id
}