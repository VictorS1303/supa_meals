import { s as supabaseClient } from './supabase_client_Ca1tTYuO.mjs';
import 'postcss';
import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import 'clsx';

// Fetch liked meals

const fetchLikedMealsData = async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();

  console.log(session);

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
};

// Resolve api_meal_id to internal meal id
const resolveApiMealIdToInternalMealId = async (apiMealId) =>
{
  if(!apiMealId)
  {
    throw new Error('API meal ID is required')
  }

  const {data: mealData, error: mealError} = await supabaseClient
    .from('meals')
    .select('id')
    .eq('api_meal_id', apiMealId)
    .single();
  
  if(!mealData || mealError)
  {
    console.error('No meal found for api_meal_id', apiMealId);
    return null
  }

  return mealData.id
};


// Fetch comments
const fetchCommentsForSingleMeal = async (mealId) =>
{
  if(!mealId)
  {
    throw new Error('Meal ID is required to fetch commments')
  }

  const {data, error} = await supabaseClient
    .from('comments')
    .select(`
      id,
      title,
      body,
      rating,
      created_at,
      updated_at,
      user:user_id (
        id,
        user_name,
        user_profile_image
      )
    `)
    .eq("meal_id", mealId)
    .order("created_at", { ascending: true });

    if(error)
    {
      console.error('Error fetching comments: ', error);
      throw error
    }

    return data    
};

// Fetch all comments
const fetchCommentsCountForMeal = async () =>
{
    const { data, error } = await supabaseClient
      .from("comments")
      .select(`
        meal_id,
        meals ( api_meal_id )
      `);

    const counts = {};

    data.forEach(({ meals }) => {
      const apiMealId = meals.api_meal_id;
      counts[apiMealId] = (counts[apiMealId] || 0) + 1;
    });

    return counts
};

// Count Likes
const countLikes = async (commentId) =>
{
  if(!commentId)
  {
    throw new Error('Comment ID required for getting comment count')
  }

  const {count: commentCountData, error: commentCountError} = await supabaseClient
    .from('likes') 
    .select('*', {count: 'exact', head: true})
    .eq('comment_id', commentId);

  if(!commentCountData || commentCountError)
  {
    console.error('No comment data: ', commentCountError);
    return 0
  }

  return commentCountData || 0
};

// Fetch notifications
const fetchNotifications = async (supabaseClient, userId) => {
  if (!userId) {
    return []
  }
  const { data: notificationData, error: notificationError } = await supabaseClient
    .from('notifications')
    .select(`
      *,
      actor:users!actor_id(user_name),
      comment:comments!notifications_target_object_id_fkey(
        body,
        meal:meals!meal_id(api_meal_id)
      )
    `)
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false });
  if (notificationError) {
    console.error('Error getting notifications:', notificationError);
    throw new Error(`Error getting notification(s): ${notificationError.message}`)
  }
  return notificationData || []
};

// Fetch amount of notifications
const fetchNotificationsAmount = async (userId, supabaseClient) => {
  if (!userId)
  {
    return 0
  }

  if (!supabaseClient) {
    throw new Error(
      "fetchNotificationsAmount: supabase client was not provided"
    )
  }

  const { count, error } = await supabaseClient
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("recipient_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error("Failed to fetch notifications count:", error);
    return 0
  }

  return count ?? 0
};

const $$Astro = createAstro();
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Section;
  const { class: className, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`${className} relative`, "class")}${addAttribute(id, "id")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/Section.astro", void 0);

export { $$Section as $, fetchNotifications as a, fetchLikedMealsData as b, countLikes as c, fetchCommentsForSingleMeal as d, fetchCommentsCountForMeal as e, fetchNotificationsAmount as f, resolveApiMealIdToInternalMealId as r };
