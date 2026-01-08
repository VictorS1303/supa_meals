export function initializeMealRating() {
    const mealRatingStars = document.querySelectorAll(".meal-rating-star")

    mealRatingStars.forEach((mealRatingStarContainer) => {
      // Query star wrappers WITHIN this specific container
      const starWrappers =
        mealRatingStarContainer.querySelectorAll(".star-wrapper")

      const input = mealRatingStarContainer
        ?.closest("form")
        ?.querySelector('input[name="comment_rating_input"]')

      const maxStars = getMaxStars(mealRatingStarContainer)
      let currentRating = getCurrentRating(input)

      if (currentRating > 0) {
        updateStarDisplay(starWrappers, currentRating)
      }

      attachEventListeners(
        mealRatingStarContainer,
        starWrappers,
        input,
        maxStars,
      )
    })
  }

export function getMaxStars(mealRatingStarContainer) {
    return parseInt(
      mealRatingStarContainer.getAttribute("data-max-stars") || "5",
    )
  }

 export function getCurrentRating(input) {
    return parseFloat(input?.value || 0)
  }

  export function attachEventListeners(
    mealRatingStarContainer,
    starWrappers,
    input,
    maxStars,
  ) {
    let currentRating = getCurrentRating(input)

mealRatingStarContainer.addEventListener("mousemove", (e) => {
      const rating = calculateRating(e, mealRatingStarContainer, maxStars)
      updateStarDisplay(starWrappers, rating)
    })

    mealRatingStarContainer.addEventListener("mouseleave", (e) => {
      updateStarDisplay(starWrappers, currentRating)
    })

    mealRatingStarContainer.addEventListener("click", (e) => {
      const rating = calculateRating(e, mealRatingStarContainer, maxStars)
      currentRating = roundToNearestHalf(rating)
      saveRating(input, currentRating)
      updateStarDisplay(starWrappers, currentRating)
    })
  }

  export function calculateRating(e, mealRatingStarContainer, maxStars) {
    const stars = mealRatingStarContainer.querySelectorAll(".star-wrapper")

    // Find which star the cursor is over or in a gap after
    for (let i = 0; i < stars.length; i++) {
      const starRect = stars[i].getBoundingClientRect()

      // Check if cursor is within this star's bounds
      if (e.clientX >= starRect.left && e.clientX <= starRect.right) {
        const cursorXInStar = e.clientX - starRect.left
        const starWidth = starRect.width
        const percentageInStar = cursorXInStar / starWidth
        return i + percentageInStar
      }

      // Check if cursor is in the gap AFTER this star (before next star)
      if (i < stars.length - 1) {
        const nextStarRect = stars[i + 1].getBoundingClientRect()
        if (e.clientX > starRect.right && e.clientX < nextStarRect.left) {
          // In gap - return the rating at the end of current star
          return i + 1
        }
      }
    }

    // If cursor is before first star
    if (e.clientX < stars[0].getBoundingClientRect().left) {
      return 0
    }

    // If cursor is after last star
    return maxStars
  }

  export function roundToNearestHalf(rating) {
    return Math.round(rating * 2) / 2
  }

  export function saveRating(input, rating) {
    if (input) {
      input.value = rating.toString()
    }
  }

  export function updateStarDisplay(starWrappers, rating) {
    starWrappers.forEach((starWrapper, index) => {
      const filledStar = starWrapper.querySelector(".star-filled")
      const starFillPercentage = calculateStarFillPercentage(rating, index)
      applyClipPath(filledStar, starFillPercentage)
    })
  }

  export function calculateStarFillPercentage(rating, starIndex) {
    const starStart = starIndex
    const starEnd = starIndex + 1

    if (rating >= starEnd) {
      return 100 // (fully filled) //
    } else if (rating > starStart) {
      return (rating - starStart) * 100 // (partially filled) //
    }

    return 0
  }

  export function applyClipPath(filledStar, starFillPercentage) {
    const rightClip = 100 - starFillPercentage
    filledStar.style.clipPath = `inset(0 ${rightClip}% 0 0)` // Remove the comma after 0
  }