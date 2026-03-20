import { supabaseClient } from "../supabase/supabase_client";
import { updateNotificationsCounter } from "../supabase/realtime_dom_helper_methods";

// NOTIFICATIONS //
export const initializeNotificationsRealtime = async () =>
{
    const { data: { user } } = await supabaseClient.auth.getUser()
    const currentUserId = user?.id

    if(!currentUserId)
    {
        return
    }

    // Initial notifications fetch
    await refreshNotificationsCounter(currentUserId)

    // Subscribe to changes - filter by recipient_id
    const notificationsChannel = supabaseClient
    .channel('realtime-notifications')
    .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `recipient_id=eq.${currentUserId}`
    }, (payload) => {
        console.log('Realtime notification event received:', payload) // Add this
        refreshNotificationsCounter(currentUserId)
    })
    .subscribe()
}

const refreshNotificationsCounter = async (currentUserId) =>
{
    const {count, error} = await supabaseClient 
        .from('notifications')
        .select('*', {count: 'exact'})
        .eq('recipient_id', currentUserId)
        .is('is_read', false)
    
    if(!error)
    {
        updateNotificationsCounter(count)
    }
    else
    {
        console.error('Error refreshing notifications counter: ', error)
    }
}

// export const initializeNotificationsRealtime = async () =>
// {
//     const {data: {user}} = await supabaseClient.auth.getUser()

//     const currentUserId = user?.id

//     if(!currentUserId)
//     {
//         return
//     }

//     // Initial notifications fetch
//     await refreshNotificationsCounter(currentUserId)

//     // Subscribe to changes
//     const notificationsChannel = supabaseClient
//         .channel('realtime-notifications')
//         .on('postgres_changes', {
//             event: '*',
//             schema: 'public',
//             table: 'notifications',
//         }, () => {
//             refreshNotificationsCounter(currentUserId)
//         })
//         .subscribe()
// }

// const refreshNotificationsCounter = async (currentUserId) =>
// {
//     const {count, error} = await supabaseClient
//         .from('notifications')
//         .select('*', {count: 'exact'})
//         .eq('user_id', currentUserId)
//         .is('is_read', false)
    
//     if(!error)
//     {
//         updateNotificationsCounter(count)
//     }
// }