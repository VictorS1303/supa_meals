import { supabaseClient } from "../supabase/supabase_client"

export const createNotification = async (recipientId, actorId, targetType, targetId, isRead = false) =>
{
    if(!recipientId || !targetId)
    {
        return
    }

    const {data: notificationsData, error: notificationsError} = await supabaseClient
        .from('notifications')
        .insert({
            recipient_id: recipientId,
            actor_id: actorId,
            is_read: isRead,
            target_object_type: targetType,
            target_object_id: targetId,
        })
        

    if(!notificationsData || notificationsError)
    {
        throw new Error(`Error inserting notification: ${notificationsError.hint, notificationsError.message}`)
    }

    return notificationsData || {}
}