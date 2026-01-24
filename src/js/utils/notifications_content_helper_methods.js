// Format notifications heading text
export const getNotificationText = (type, objectType) => {
  const messages = {
    like: `liked your ${objectType}`,
    comment: `comment on your ${objectType}`,
  }

  return messages[type] || `interacted with your ${objectType}`
}

// Get notifications lins
export const getNotificationLink = (notification) => {
  const { target_object_type, target_object_id } = notification

  switch (target_object_type) {
    case "comment":
      // target_object_id is the comment ID
      // notification.comment.meal_id is the meal ID
      return `/meals/${notification.comment.meal.api_meal_id}#comment-${target_object_id}`
    case "meal":
      return `/meals/${target_object_id}`
    default:
      return "/dashboard"
  }
}