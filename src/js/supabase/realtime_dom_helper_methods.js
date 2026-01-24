import { supabaseClient } from "./supabase_client.js"
import { fetchNotificationsAmount } from "./supabase_methods.js"
import { formatCommentPostDate, formatDate } from "../utils/formatters.js"
import { hasUserLikedComment, countLikes, fetchSingleComment } from "./supabase_methods.js"
// Create comment card
export const createCommentCard = async (comment, currentUserId) => {
  const commentCard = document.createElement('article')
  commentCard.className = 'bg-white rounded-md relative w-full p-4 flex flex-col gap-6 md:max-w-[400px] comment-card group'
  commentCard.dataset.id = comment.id
  commentCard.dataset.commentTitle = comment.title
  commentCard.dataset.commentBodyText = comment.body
  commentCard.dataset.commentRating = comment.rating

  // Checking to see whether the comment is by the currently signed in user
  const isOwnComment = comment.user.id === currentUserId

  // Check if user has liked this comment
  const hasLiked = await hasUserLikedComment(currentUserId, comment.id)

  // Append action buttons container
  const commentCardActionButtonsContainer = createCommentCardActionButtonsContainer(
    comment,
    'comment-action-buttons-container absolute -right-2 -top-4 flex gap-2 opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100'
  )

  const commentCardHeader = createCommentCardHeader(comment, 'flex gap-4 items-center')
  const commentCardBody = createCommentCardBodyContainer(comment, 'comment-card-body-container')
  const commentCardFooter = await createCommentCardFooter(comment, currentUserId, hasLiked, isOwnComment, 'mt-auto')

  // Append child elements
  commentCard.append(commentCardActionButtonsContainer, commentCardHeader, commentCardBody, commentCardFooter)
  return commentCard
}

// Create action buttons container
const createCommentCardActionButtonsContainer = (comment, commentCardActionButtonsContainerClasses) => {
  const commentCardActionButtonsContainer = document.createElement('div')
  commentCardActionButtonsContainer.className = commentCardActionButtonsContainerClasses
  commentCardActionButtonsContainer.dataset.commentUserId = comment.user.id

  const editActionButton = createEditActionButton(
    comment,
    'cursor-pointer bg-(--secondary-text-color) grid place-content-center h-9 w-9 rounded-full text-white transition-all duration-150 ease-in hover:opacity-95 hover:shadow-md'
  )

  const deleteActionButton = createDeleteActionButton(comment, 'cursor-pointer bg-red-400 grid place-content-center h-9 w-9 rounded-full text-white transition-all duration-150 ease-in hover:opacity-95 hover:shadow-md')

  commentCardActionButtonsContainer.append(editActionButton, deleteActionButton)
  return commentCardActionButtonsContainer
}

// Create comment edit action button
const createEditActionButton = (comment, editActionButtonClasses) => {
  const editActionButton = document.createElement('button')
  editActionButton.className = editActionButtonClasses
  editActionButton.dataset.action = 'edit-comment'
  editActionButton.dataset.id = comment.id

  const editActionButtonIcon = createEditActionButtonIcon('fa-solid fa-pencil-alt text-white')
  editActionButton.appendChild(editActionButtonIcon)

  return editActionButton
}

// Create comment edit action button icon
const createEditActionButtonIcon = (editActionButtonIconClasses) => {
  const editActionButtonIcon = document.createElement('i')
  editActionButtonIcon.className = editActionButtonIconClasses

  return editActionButtonIcon
}

// Create comment delete action button
const createDeleteActionButton = (comment, deleteActionButtonClasses) => {
  const deleteActionButton = document.createElement('button')
  deleteActionButton.className = deleteActionButtonClasses
  deleteActionButton.dataset.action = 'delete-comment'
  deleteActionButton.dataset.id = comment.id

  const deletActionButtonIcon = createDeleteActionButtonIcon('fas fa-trash-alt')
  deleteActionButton.appendChild(deletActionButtonIcon)

  return deleteActionButton
}

// Create comment delete action button icon
const createDeleteActionButtonIcon = (deleteActionButtonClasses) => {
  const deleteActionButtonIcon = document.createElement('i')
  deleteActionButtonIcon.className = deleteActionButtonClasses

  return deleteActionButtonIcon
}

// Create card header
const createCommentCardHeader = (comment, commentCardHeaderClasses) => {
  const commentCardHeader = document.createElement('header')
  commentCardHeader.className = commentCardHeaderClasses

  const commentCardProfileImage = createCommentCardProfileImage(
    comment.user.user_profile_image,
    comment.user.user_name,
    'h-[100px] w-[100px] rounded-full'
  )

  const usernameContainer = createUsernameContainer(comment.user.user_name, 'username text-(--secondary-text-color) text-xl')

  const dateOfPostContainer = createDateOfPostContainer(comment, 'text-md text-gray-400')

  let dateOfEditContainer = null
  if (comment.updated_at) {
    dateOfEditContainer = createDateOfEditContainer(comment, 'text-sm text-gray-400 italic mt-1')
  }

  const commmentCardHeaderNarrowingContainer = createCommentCardHeaderNarrowingContainer(
    'tracking-tighter mb-0.5',
    usernameContainer,
    dateOfPostContainer,
    dateOfEditContainer
  )

  commentCardHeader.append(
    commentCardProfileImage,
    commmentCardHeaderNarrowingContainer
  )

  return commentCardHeader
}

// Create card profile image
const createCommentCardProfileImage = (src, alt, commentCardProfileImageClasses) => {
  const commentCardProfileImage = document.createElement('img')
  commentCardProfileImage.className = commentCardProfileImageClasses
  commentCardProfileImage.alt = alt
  commentCardProfileImage.src = src

  return commentCardProfileImage
}

// Create username and comment time container
const createUsernameAndCommentTimeContainer = (usernameAndCommentTimeContainerClasses) => {
  const usernameAndCommentTimeContainer = document.createElement('div')
  usernameAndCommentTimeContainer.className = usernameAndCommentTimeContainerClasses

  return usernameAndCommentTimeContainer
}

// Create comment card header narrowing container
const createCommentCardHeaderNarrowingContainer = (
  createCommentCardHeaderNarrowingContainer,
  usernameContainer,
  dateOfPostContainer,
  dateOfEditContainer = null
) => {
  const commentCardHeaderNarrowingContainer = document.createElement('div')
  commentCardHeaderNarrowingContainer.className = createCommentCardHeaderNarrowingContainer

  const usernameAndCommentTimeContainer = createUsernameAndCommentTimeContainer('flex flex-col username-and-comment-time')

  usernameAndCommentTimeContainer.append(
    usernameContainer,
    dateOfPostContainer
  )

  if (dateOfEditContainer) {
    usernameAndCommentTimeContainer.append(dateOfEditContainer)
  }

  commentCardHeaderNarrowingContainer.appendChild(usernameAndCommentTimeContainer)

  return commentCardHeaderNarrowingContainer
}

// Create username container
const createUsernameContainer = (username, usernameContainerClasses) => {
  const usernameContainer = document.createElement('span')
  usernameContainer.className = usernameContainerClasses
  usernameContainer.textContent = username

  return usernameContainer
}

// Create date of post container
const createDateOfPostContainer = (comment, dateOfPostContainerClasses) => {
  const dateOfPostContainer = document.createElement('p')
  dateOfPostContainer.className = `${dateOfPostContainerClasses} posted-timestamp`

  // Format the date
  const formattedDate = formatCommentPostDate(comment.created_at)

  // Set "Posted: " text
  dateOfPostContainer.textContent = 'Posted: '

  // Append the <span> with the formatted date
  const dateOfPost = createDateOfPost(formattedDate, 'text-md text-gray-400')
  dateOfPostContainer.append(dateOfPost)

  return dateOfPostContainer
}

// Create date of post
const createDateOfPost = (dateOfPostText, dateOfPostClasses) => {
  const dateOfPost = document.createElement('span')
  dateOfPost.className = dateOfPostClasses
  dateOfPost.textContent = dateOfPostText
  return dateOfPost
}

// Create date of edit container
const createDateOfEditContainer = (comment, dateOfEditContainerClasses) => {
  if (!comment.updated_at) {
    return null
  }

  const dateOfEditContainer = document.createElement('p')
  dateOfEditContainer.className = `${dateOfEditContainerClasses} edited-timestamp`
  dateOfEditContainer.textContent = 'Edited: '

  // Use existing helper
  const dateOfEdit = createDateOfEdit(formatDate(comment.updated_at))
  dateOfEditContainer.appendChild(dateOfEdit)

  return dateOfEditContainer
}

// Create date of edit
const createDateOfEdit = (dateOfEditText) => {
  const dateOfEdit = document.createElement('span')
  dateOfEdit.textContent = dateOfEditText
  return dateOfEdit
}

// Create comment card body container
const createCommentCardBodyContainer = (comment, commentCardBodyContainerClasses) => {
  const commentCardBodyContainer = document.createElement('div')
  commentCardBodyContainer.className = commentCardBodyContainerClasses

  const commentCardBodyHeader = createCommentCardBodyHeader(
    comment,
    'mb-1 flex items-center gap-4 text-[var(--secondary-text-color)] text-xl'
  )

  const commentCardBodyTextContainer = createCommentCardBodyTextContainer(comment, 'paragraph-wrapper collapsed')

  const readMoreButton = createReadMoreButton(
    'read-more-btn text-(--secondary-text-color) cursor-pointer',
    'read_more_btn',
    'button'
  )

  commentCardBodyContainer.append(commentCardBodyHeader, commentCardBodyTextContainer, readMoreButton)
  return commentCardBodyContainer
}

// Create comment card body header
const createCommentCardBodyHeader = (comment, commentCardBodyHeaderClasses) => {
  const commentCardBodyHeader = document.createElement('header')
  commentCardBodyHeader.className = commentCardBodyHeaderClasses

  const commentCardBodyHeaderText = createCommentCardBodyHeaderText(comment.title, 'mb-2')
  commentCardBodyHeader.appendChild(commentCardBodyHeaderText)

  return commentCardBodyHeader
}

// Create comment card body header text
const createCommentCardBodyHeaderText = (commentTitle, commentCardBodyHeaderTextClasses) => {
  const commentCardBodyHeaderText = document.createElement('h3')
  commentCardBodyHeaderText.className = commentCardBodyHeaderTextClasses
  commentCardBodyHeaderText.textContent = commentTitle

  return commentCardBodyHeaderText
}

// Create comment card body text container
const createCommentCardBodyTextContainer = (comment, commentCardBodyTextContainerClasses) => {
  const commentCardBodyTextContainer = document.createElement('div')
  commentCardBodyTextContainer.className = commentCardBodyTextContainerClasses

  const commentCardBodyText = createCommentCardBodyText(comment.body)
  commentCardBodyTextContainer.appendChild(commentCardBodyText)

  return commentCardBodyTextContainer
}

// Create comment card body text
const createCommentCardBodyText = (commentBodyText) => {
  const commentCardBodyText = document.createElement('p')
  commentCardBodyText.textContent = commentBodyText

  return commentCardBodyText
}

// Create read more button
const createReadMoreButton = (readMoreButtonClasses, readMoreButtonId, readMoreButtonType) => {
  const readMoreButton = document.createElement('button')
  readMoreButton.className = readMoreButtonClasses
  readMoreButton.dataset.id = readMoreButtonId
  readMoreButton.id = readMoreButtonId
  readMoreButton.type = readMoreButtonType
  readMoreButton.textContent = 'Read more'

  return readMoreButton
}

// Create comment card footer
const createCommentCardFooter = async (comment, currentUserId, hasLiked, isOwnComment, commentCardFooterClasses) => {
  const commentCardFooter = document.createElement('footer')
  commentCardFooter.className = commentCardFooterClasses

  // Likes & ratings container
  const likesAndRatingsContainer = await createLikesAndRatingsContainer(
    comment,
    currentUserId,
    hasLiked,
    isOwnComment,
    'likes-and-ratings-container flex items-center justify-between'
  )

  commentCardFooter.appendChild(likesAndRatingsContainer)

  // Create rating container (number + stars)
  const ratingContainer = createRatingsContainer('flex items-center gap-2 align-center')

  // Rating number
  const ratingNumber = createRatingNumber(comment.rating, 'rating-number text-(--secondary-text-color)')
  ratingContainer.appendChild(ratingNumber)

  // Rating stars → Create SVG-based stars with proper structure
  const starContainer = document.createElement('div')
  starContainer.className = 'rating-star-wrapper flex gap-1'
  
  const maxStars = 5
  for (let i = 0; i < maxStars; i++) {
    const wrapper = document.createElement('div')
    wrapper.className = 'star-wrapper relative w-5 h-5'
    
    // Empty star (background)
    const emptyStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    emptyStar.setAttribute('viewBox', '0 0 24 24')
    emptyStar.setAttribute('fill', 'currentColor')
    emptyStar.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'star-empty', 'text-gray-300')
    emptyStar.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    
    // Filled star (foreground with clip-path)
    const filledStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    filledStar.setAttribute('viewBox', '0 0 24 24')
    filledStar.setAttribute('fill', 'currentColor')
    filledStar.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'star-filled', 'text-yellow-400')
    filledStar.style.clipPath = 'inset(0 100% 0 0)'
    filledStar.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    
    wrapper.appendChild(emptyStar)
    wrapper.appendChild(filledStar)
    starContainer.appendChild(wrapper)
  }
  
  // Set initial star display
  updateStarDisplay(starContainer.querySelectorAll('.star-wrapper'), comment.rating)
  
  ratingContainer.appendChild(starContainer)
  likesAndRatingsContainer.appendChild(ratingContainer)

  return commentCardFooter
}


// Create likes and ratings container
const createLikesAndRatingsContainer = async (comment, currentUserId, hasLiked, isOwnComment, likesAndRatingsContainerClasses) => {
  const likesAndRatingsContainer = document.createElement('div')
  likesAndRatingsContainer.className = likesAndRatingsContainerClasses

  const likesCounterContainer = await createLikesCounterContainer(comment, comment.user.id, comment.id, hasLiked, 'like-counter-container flex gap-2 text-(--secondary-text-color) text-xl', currentUserId, isOwnComment)
  likesAndRatingsContainer.append(likesCounterContainer)

  return likesAndRatingsContainer
}

// Create likes counter container
const createLikesCounterContainer = async (comment, commentAuthor, commentId, hasLiked, likesCounterContainerClasses, currentUserId, isOwnComment) => {
  const likesCounterContainer = document.createElement('article')
  likesCounterContainer.className = likesCounterContainerClasses
  likesCounterContainer.dataset.commentAuthorId = commentAuthor
  likesCounterContainer.dataset.commentId = commentId
  likesCounterContainer.dataset.hasLiked = hasLiked

  if (isOwnComment) {
    likesCounterContainer.classList.add('opacity-40', 'pointer-events-none')
    likesCounterContainer.setAttribute('aria-disabled', 'true')
  }

  const likeButton = createLikeButton(
    comment,
    currentUserId,
    'cursor-pointer like-button',
    `like-btn-${comment.id}`,
    hasLiked
  )

  const likesCounter = await createLikesCounter(comment, 'like-amount')
  likesCounterContainer.append(likeButton, likesCounter)

  return likesCounterContainer
}

// Create like button
const createLikeButton = (comment, currentUserId, likeButtonClasses, likeButtonId, hasLiked) => {
  const likeButton = document.createElement('button')
  likeButton.className = likeButtonClasses
  likeButton.id = likeButtonId
  likeButton.dataset.commentId = comment.id
  likeButton.dataset.currentId = currentUserId

  const likeButtonIcon = createLikeButtonIcon(hasLiked)

  likeButton.appendChild(likeButtonIcon)

  return likeButton
}

// Create like button icon
const createLikeButtonIcon = (hasLiked) => {
  const likeButtonIcon = document.createElement('i')
  likeButtonIcon.className = hasLiked ? 'fa-thumbs-up fa-solid' : 'fa-thumbs-up fa-regular'

  return likeButtonIcon
}

// Create like counter
const createLikesCounter = async (comment, likesCounterClasses) => {
  const likesCounter = document.createElement('span')
  likesCounter.className = likesCounterClasses
  likesCounter.textContent = await countLikes(comment.id)

  return likesCounter
}

// Create ratings container
const createRatingsContainer = (ratingsContainerClasses) => {
  const ratingsContainer = document.createElement('div')
  ratingsContainer.className = ratingsContainerClasses

  return ratingsContainer
}

// Create rating stars container


// Create rating number
const createRatingNumber = (ratingValue, ratingNumberClasses) => {
  const ratingNumberEl = document.createElement('span')
  ratingNumberEl.className = ratingNumberClasses
  ratingNumberEl.textContent = `${ratingValue} / 5`

  return ratingNumberEl
}

// Create rating stars
const createRatingStars = (rating, maxStars = 5, starColorClasses = '') => {
  const stars = []

  for (let i = 1; i <= maxStars; i++) {
    const ratingStar = document.createElement('i')

    if (i <= Math.floor(rating)) {
      ratingStar.className = `fas fa-star ${starColorClasses}` // full star
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      ratingStar.className = `fas fa-star-half-alt ${starColorClasses}` // half star
    } else {
      ratingStar.className = `far fa-star ${starColorClasses}` // empty star
    }

    ratingStar.setAttribute('aria-hidden', 'true')
    stars.push(ratingStar)
  }

  return stars
}

const createRatingStarsContainer = (rating, containerClasses = 'flex gap-1', starColorClasses = '') => {
  const container = document.createElement('div')
  container.className = `rating-star-wrapper ${containerClasses}`
  
  const maxStars = 5

  for (let i = 0; i < maxStars; i++) {
    const wrapper = document.createElement('div')
    wrapper.className = 'star-wrapper relative w-5 h-5'
    wrapper.setAttribute('data-star-index', i + 1)

    // Empty star
    const emptyStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    emptyStar.setAttribute('viewBox', '0 0 24 24')
    emptyStar.setAttribute('fill', 'currentColor')
    emptyStar.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'star-empty', 'text-gray-300')
    emptyStar.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'

    // Filled star
    const filledStar = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    filledStar.setAttribute('viewBox', '0 0 24 24')
    filledStar.setAttribute('fill', 'currentColor')
    filledStar.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'star-filled', starColorClasses || 'text-yellow-400')
    filledStar.style.clipPath = 'inset(0 100% 0 0)'
    filledStar.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'

    wrapper.appendChild(emptyStar)
    wrapper.appendChild(filledStar)
    container.appendChild(wrapper)
  }

  // Set initial fill based on rating
  const starWrappers = container.querySelectorAll('.star-wrapper')
  updateStarDisplay(starWrappers, rating)

  return container
}

// Create "No comments" message
const createNoCommentsMessage = (noCommentsText, noCommentsClasses) =>
{
    const noCommentsMessage = document.createElement('p')
    noCommentsMessage.className = noCommentsClasses
    noCommentsMessage.textContent = noCommentsText

    return noCommentsMessage
}

// Update comment in DOM - EXPORTED for use in main component
export const updateCommentInDOM = (comment) => {
  const commentCard = document.querySelector(`.comment-card[data-id="${comment.id}"]`)
  if (!commentCard)
  {
    console.log('Comment card not found')
    return
  }

  console.log('Updating comment: ', comment.id, 'Rating: ', comment.rating)

  // Update dataset attributes
  commentCard.dataset.commentTitle = comment.title
  commentCard.dataset.commentBodyText = comment.body
  commentCard.dataset.commentRating = comment.rating

  // Update rating number
  const ratingNumber = commentCard?.querySelector('.rating-number')
  if(ratingNumber)
  {
    ratingNumber.textContent = `${comment.rating} / 5`
    console.log('Updated rating number')
  }

  // Update rating stars
  const starContainer = commentCard?.querySelector('.rating-star-wrapper')

  console.log('Star container found: ', !!starContainer)

  if(starContainer) {
    const starWrappers = starContainer.querySelectorAll('.star-wrapper')
    console.log('Star wrappers found:', starWrappers.length)

    if (starWrappers.length) {
      updateStarDisplay(starWrappers, comment.rating)
    }
  }

  // Update title
  const titleElement = commentCard.querySelector("h3")
  if (titleElement) 
  {
titleElement.textContent = comment.title
  }

  // Update body
  const bodyElement = commentCard.querySelector(".comment-card-body-container p")
  if (bodyElement)
  {
 bodyElement.textContent = comment.body
  }

  // --- EDITED TIMESTAMP ---
  const headerContainer = commentCard.querySelector(".username-and-comment-time")
  if (!headerContainer)
  {
 return
  }

  // Look for existing edited timestamp
  let editedContainer = headerContainer.querySelector(".edited-timestamp")

headerContainer.querySelectorAll(".edited-timestamp").forEach(el => el.remove())

  if (comment.updated_at) {
    const formattedDate = formatDate(comment.updated_at, "short", "numeric", "numeric")

    if (editedContainer) {
      // Already exists → just update the span
      const span = editedContainer.querySelector("span")
      if (span) 
      {
        span.textContent = formattedDate
      }

      editedContainer.classList.remove("hidden")
    } else {
      // Create only once if it doesn't exist
      const newEditedContainer = document.createElement("p")
      newEditedContainer.className = "text-sm text-gray-400 mt-1 italic edited-timestamp"
      newEditedContainer.textContent = "Edited: "

      const span = document.createElement("span")
      span.textContent = formattedDate
      newEditedContainer.appendChild(span)

      // Append AFTER the "Posted:" container so layout stays correct
      const postedContainer = headerContainer.querySelector(".posted-timestamp")
      if (postedContainer) {
        postedContainer.insertAdjacentElement("afterend", newEditedContainer)
      } else {
        headerContainer.appendChild(newEditedContainer)
      }
    }
  } else if (editedContainer) {
    // Hide if no updated_at
    editedContainer.classList.add("hidden")
  }
}


const updateCommentStars = (commentCard, rating) => {
  const starContainer = commentCard.querySelector('.rating-star-wrapper')
  if (!starContainer)
  {
    return
  }

  const starWrappers = starContainer.querySelectorAll('.star-wrapper')
  if (!starWrappers.length) 
  {
    return
  }

  // Reset all stars
  starWrappers.forEach((wrapper) => {
    const filledStar = wrapper.querySelector('.star-filled')
    if (filledStar)
    {
      filledStar.style.clipPath = 'inset(0 100% 0 0)'
    }
  })

  // Force repaint
  starContainer.offsetHeight

  // Fill stars according to rating
  updateStarDisplay(starWrappers, rating)
  console.log('Stars updated to:', comment.rating)
}

export const addCommentToDOM = async (commentId, commentsSection) => {
  try {
    const newComment = await fetchSingleComment(commentId)
    if (!newComment)
    {
      return
    }

    // Remove "No comments" message
    const noCommentsMessage = commentsSection.querySelector("p")
    if (noCommentsMessage?.textContent === "No comments") noCommentsMessage.remove()

    const {
      data: { session },
    } = await supabaseClient.auth.getSession()
    const currentUserId = session?.user?.id

    const commentCard = await createCommentCard(newComment, currentUserId)
    commentsSection.appendChild(commentCard)
  } catch (error) {
    console.error("Error adding comment:", error)
  }
}

// Delete comment in DOM
export const deleteCommentFromDOM = (commentId) => {

  const commentCard = document.querySelector(`.comment-card[data-id="${commentId}"]`)
  const commentSection = document.querySelector('.comments-section')

  if (!commentCard) {
    console.warn("No comment card found for id:", commentId)
    return
  }

  commentCard.remove()

  if (commentSection.querySelectorAll('.comment-card').length === 0) {
    const noCommentsMessage = createNoCommentsMessage(
      'text-(--secondary-text-color)',
      'No comments'
    )
    commentSection.appendChild(noCommentsMessage)
  }
}


// NOTIFICATIONS //
export const createNotifications = async () =>
{
  // Get current user
  const { data: { session } } = await supabaseClient.auth.getSession()
  const currentUserId = session?.user?.id
  
  if (!currentUserId) {
    console.log("No user logged in")
    return
  }
  
  const notificationsButton = document.getElementById('notifications_button')
  
  
  // Target the EXISTING Astro-rendered popover
  const notificationsListPopover = document.querySelector('.notifications-list')
  const notificationsListUL = notificationsListPopover?.querySelector('.notifications-list-popover')
  
  if (!notificationsListPopover || !notificationsListUL) {
    console.error("Notifications elements not found")
    return
  }
  
  // Setup Popper instance with the existing popover
  const popperInstance = Popper.createPopper(notificationsButton, notificationsListPopover, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        }
      },
    ]
  })
  
  // Handle popover toggle
  notificationsListPopover.addEventListener('toggle', (e) => {
    if(e.newState === 'open')
    {
      popperInstance.update()
      console.log("Notifications popover opened")
    }
  })
}

export function createNotificationsCounter(notificationsCounterClasses, notificationsCounterId, notificationsCount)
{
  const notificationsCounter = document.createElement('span')
  notificationsCounter.className = notificationsCounterClasses
  notificationsCounter.id = notificationsCounterId
  notificationsCounter.textContent = notificationsCount
  return notificationsCounter
}

// Update notifications counter
export const updateNotificationsCounter = (newCount) => {
  const counter = document.getElementById("notification_counter")
  if (!counter)
  {
    return
  }
  const count = Number(newCount) || 0
  counter.textContent = count
  counter.style.display = count > 0 ? "grid" : "none"
}

// NOTIFICATIONS LIST //

// Create Notifications List Wrapper
const createNotificationsListWrapper = (notificationsListWrapperClasses, notificationsListWrapperId) =>
{
  const notificationsListWrapper = document.createElement('article')
  notificationsListWrapper.className = notificationsListWrapperClasses
  notificationsListWrapper.id = notificationsListWrapperId
  return notificationsListWrapper
}

// Create notifications list li
export const createNotificationsListLI = (classes, id, notification) =>
{
  const li = document.createElement('li')
  li.className = classes
  li.id = id

  const link =
    createNotificationsListLiLink(
      'flex flex-col items-start gap-1 p-3 block',
      notification
    )

  

  li.append(link)

  return li
}

// Create notification date wrapper
const createNotificationDateWrapper = (notificationDateWrapperClasses, notification) =>
{
  const notificationDateWrapper = document.createElement('div')
  notificationDateWrapper.className = notificationDateWrapperClasses

  const notificationDate =
    createNotificationDate(
      'text-xs text-gray-400',
      notification.created_at
    )

  notificationDateWrapper.appendChild(notificationDate)
  return notificationDateWrapper
}

// Create notification date
const createNotificationDate = (notificationDateClasses, dateValue) =>
{
  const notificationDate = document.createElement('span')
  notificationDate.className = notificationDateClasses
  notificationDate.textContent = formatDate(dateValue) // ✅ formatted once

  return notificationDate
}

// Create is read marker
const createIsNotificationReadMarker = (classes, isNotificationRead) =>
{
  const isNotificationReadMarker = document.createElement('span')
  isNotificationReadMarker.className = classes

  if (!isNotificationRead) {
    isNotificationReadMarker.classList.add('block', 'text-(--secondary-text-color)')
  } else {
    isNotificationReadMarker.classList.add('hidden')
  }

  return isNotificationReadMarker
}

// Create notifications list li link
import { getNotificationLink } from "../utils/notifications_content_helper_methods.js"

const createNotificationsListLiLink = (notificationsListLiLinkClasses, notification) =>
{
  const notificationListLiLink = document.createElement('a')
  notificationListLiLink.className = notificationsListLiLinkClasses
  notificationListLiLink.setAttribute('href', getNotificationLink(notification))
  notificationListLiLink.setAttribute('data-notification-id', notification.id)

  // Append - pass full notification object
  const notificationsListLiLinkContentWrapper = createNotificationsListLiLinkContentWrapper('flex flex-col gap-2', notification)

  notificationListLiLink.append(notificationsListLiLinkContentWrapper)

  return notificationListLiLink
}



// Create notifications list li link content wrapper
const createNotificationsListLiLinkContentWrapper = (notificationsListLiLinkContentWrapperClasses, notification) =>
{
  const notificationsListLiLinkContentWrapper = document.createElement('div')
  notificationsListLiLinkContentWrapper.className = notificationsListLiLinkContentWrapperClasses

  // Append
  const notificationsListLiLinkContentHeadingWrapper = createNotificationsListLiLinkContentHeadingWrapper('flex flex-col items-start justify-between mb-3')
  const notificationDateWrapper = createNotificationDateWrapper('flex flex-col items-start gap-1', notification)
  const notificationContentAndIsReadMarkerContainer = createNotificationContentAndIsReadMarkerContainer('flex justify-between w-full')
  const notificationsHeadingMessageText = createNotificationsHeadingMessageText('text-(--secondary-text-color) text-sm font-medium whitespace-nowrap', notification.type, notification.target_object_type)
  const notificationContentWrapper = createNotificationContentWrapper('flex-1')
  const notificationParagraph = createNotificationParagraph('text-sm text-gray-500 truncate overflow-hidden text-ellipsis whitespace-normal mt-2', notification.comment)
  const isReadMarker =
    createIsNotificationReadMarker(
      'self-center shrink-0 w-2 h-2 bg-(--secondary-text-color) rounded-full',
      notification.is_read
    )

  notificationsListLiLinkContentWrapper.append(notificationsListLiLinkContentHeadingWrapper, notificationsHeadingMessageText, notificationContentAndIsReadMarkerContainer)
  notificationsListLiLinkContentHeadingWrapper.append(notificationsHeadingMessageText, notificationDateWrapper)
  notificationContentAndIsReadMarkerContainer.append(notificationContentWrapper, isReadMarker)
  notificationContentWrapper.append(notificationParagraph)

  return notificationsListLiLinkContentWrapper
}

// Create ntoification paragraph
const createNotificationParagraph = (notificationParagraphClasses, comment) =>
{
  const notificationParagraph = document.createElement('p')
  notificationParagraph.className = notificationParagraphClasses

  // Append
  const notificationQuote = createNotificationQuote('block italic', comment.body)

  console.log('Comment body: ', comment.body)

  notificationParagraph.append(notificationQuote)

  return notificationParagraph
}

// Create notification quote
const createNotificationQuote = (notificationQuoteClasses, notificationCommentText) =>
{
  const notificationQuote = document.createElement('q')
  notificationQuote.className = notificationQuoteClasses
  notificationQuote.textContent = notificationCommentText

  return notificationQuote
}


// Create nofitication content and is read marker container
const createNotificationContentAndIsReadMarkerContainer = (notificationContentAndIsReadMarkerContainerClasses) =>
{
  const notificationContentAndIsReadMarkerContainer = document.createElement('div')
  notificationContentAndIsReadMarkerContainer.className = notificationContentAndIsReadMarkerContainerClasses
  return notificationContentAndIsReadMarkerContainer
}

// Create notification content wrapper
const createNotificationContentWrapper = (notificationContentWrapperClasses) =>
{
  const notificationContentWrapper = document.createElement('div')
  notificationContentWrapper.className = notificationContentWrapperClasses

  return notificationContentWrapper
}

// Create notifications heading message text
import { getNotificationText } from "../utils/notifications_content_helper_methods.js"

const createNotificationsHeadingMessageText = (notificationsHeadingMessageTextClasses, notificationType, notificationObjectType) =>
{
  const notificationsHeadingMessageText = document.createElement('p')
  notificationsHeadingMessageText.className = notificationsHeadingMessageTextClasses
  notificationsHeadingMessageText.textContent = getNotificationText(notificationType, notificationObjectType)

  return notificationsHeadingMessageText
}


// Create notifications list li link content heading wrapper
const createNotificationsListLiLinkContentHeadingWrapper = (notificationsListLiLinkContentHeadingWrapperClasses) =>
{
  const notificationsListLiLinkContentHeadingWrapper = document.createElement('div')
  notificationsListLiLinkContentHeadingWrapper.className = notificationsListLiLinkContentHeadingWrapperClasses

  return notificationsListLiLinkContentHeadingWrapper
}
