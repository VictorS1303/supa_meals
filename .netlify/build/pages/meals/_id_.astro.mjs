import { d as createComponent, e as createAstro, m as maybeRenderHead, j as renderComponent, g as addAttribute, r as renderTemplate, k as renderScript, l as renderSlot } from '../../chunks/astro/server_ON6jawE_.mjs';
import { $ as $$Button, b as $$Link, a as $$Layout } from '../../chunks/Link_DemNDw7d.mjs';
import { $ as $$Hero, a as $$Overlay } from '../../chunks/Overlay_B3oYg2tR.mjs';
import { $ as $$Heading } from '../../chunks/Heading_CZ96zJT1.mjs';
import { $ as $$Section, c as countLikes, r as resolveApiMealIdToInternalMealId, d as fetchCommentsForSingleMeal } from '../../chunks/Section_DdAP44KF.mjs';
import { b as formatInstructions, c as formatCommentPostDate, a as formatDate } from '../../chunks/formatters_DA-I8caS.mjs';
import 'clsx';
import { $ as $$Dialog } from '../../chunks/Dialog_Cm1wI2BO.mjs';
import { $ as $$Form } from '../../chunks/Form_hu7zLN3U.mjs';
import { $ as $$Paragraph } from '../../chunks/Paragraph_Bfh68Nk8.mjs';
import { $ as $$Card, f as fetchSingleMealById } from '../../chunks/Card_D0Ws5z9W.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro$i = createAstro();
const $$IngredientsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$IngredientsList;
  const { class: className, id, meal } = Astro2.props;
  const ingredients = Object.entries(meal).filter(([key, value]) => key.startsWith("strIngredient") && value).map(([key, value]) => {
    const index = key.replace("strIngredient", "");
    const rawMeasure = meal[`strMeasure${index}`] ?? "";
    const measure = rawMeasure.trim();
    if (!measure) {
      return value;
    }
    return `${value} (${measure})`;
  });
  return renderTemplate`${maybeRenderHead()}<article class="ingredients-list mt-8" id="ingredients_list"> ${renderComponent($$result, "Heading", $$Heading, { "variant": "single_view_sub_heading" }, { "default": ($$result2) => renderTemplate`Ingredients` })} <ol${addAttribute(`${className} mt-4 flex flex-col gap-4`, "class")}${addAttribute(id, "id")}> ${ingredients.length > 0 ? ingredients.map((ingredient, index) => renderTemplate`<li class="flex gap-3 whitespace-nowrap"> <span class="text-[var(--secondary-text-color)] text-2xl hidden sm:inline-block"> ${index + 1}.
</span> <span class="text-white text-xl">${ingredient}</span> </li>`) : renderTemplate`<p>No ingredients listed</p>`} </ol> </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/lists/IngredientsList.astro", void 0);

const $$Astro$h = createAstro();
const $$CookingInstructionsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$CookingInstructionsList;
  const { class: className, id, meal } = Astro2.props;
  const steps = formatInstructions(meal.strInstructions);
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "mt-12 mb-6" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "variant": "single_view_sub_heading" }, { "default": ($$result3) => renderTemplate` How to ` })} ${maybeRenderHead()}<article class="cooking-instruction-list-wrapper mt-4 w-full md:w-[60%]" id="cooking_instruction_list_wrapper"> <ol class="flex flex-col gap-6"> ${steps.map((step, index) => renderTemplate`<li class="flex gap-3 items-center align-center whitespace-wrap "> <span class="text-[var(--secondary-text-color)] text-2xl self-start hidden sm:inline-block"> ${index + 1}.
</span> <span class="text-white text-xl">${step}</span> </li>`)} </ol> </article> ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/lists/CookingInstructionsList.astro", void 0);

const $$Astro$g = createAstro();
const $$VideoPlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$VideoPlayer;
  const { videoTitle, videoSrc, videoPoster, videoId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="wrapper video-wrapper relative" id="video_player" data-plyr-provider="youtube"${addAttribute(videoId, "data-plyr-embed-id")}></div> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/video_players/VideoPlayer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/video_players/VideoPlayer.astro", void 0);

const $$Astro$f = createAstro();
const $$CookingInstructionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$CookingInstructionSection;
  const {
    class: className,
    id,
    headingText,
    ingredients,
    meal,
    videoId
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": className, "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-6"> ${renderComponent($$result2, "Heading", $$Heading, { "isSingleViewSubHeading": true, "headingText": headingText })} <div class="flex flex-col md:flex-row gap-6"> <!-- Left column: Ingredients + Instructions --> <div> ${renderComponent($$result2, "IngredientsList", $$IngredientsList, { "meal": meal, "ingredients": ingredients })} ${renderComponent($$result2, "CookingInstructionsList", $$CookingInstructionsList, { "meal": meal })} </div> <!-- Right column: Video --> <div class="flex-0 md:flex-1/2"> ${videoId && renderTemplate`${renderComponent($$result2, "VideoPlayer", $$VideoPlayer, { "videoId": videoId, "videoTitle": meal.strMeal, "videoSrc": meal.strYoutube, "videoPoster": meal.strMealThumb })}`} </div> </div> </div> ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/CookingInstructionSection.astro", void 0);

const getYouTubeId = (url) =>
{
    if(!url)
    {
        return null
    }

    url = url.trim();

    try {
    // Standard YouTube URL
    if (url.includes("watch?v=")) {
      const parsed = new URL(url);
      return parsed.searchParams.get("v");
    }

    // Shortened URL
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      return parts[1].split("?")[0]; // remove extra query params if any
    }
  } catch (err) {
    console.error("Invalid YouTube URL:", url);
    return null;
  }

  return null;
};

const $$Astro$e = createAstro();
const $$MealRatingsInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$MealRatingsInput;
  const { class: className, id, maxStars } = Astro2.props;
  const baseStarClasses = `absolute inset-0 w-full h-full`;
  const starsArray = Array.from({ length: maxStars });
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className} meal-rating-stars-container my-4`, "class")}> <div class="meal-rating-star flex gap-3 cursor-pointer relative my-2"${addAttribute(maxStars, "data-max-stars")}> ${starsArray.map((star, index) => renderTemplate`<div class="star-wrapper relative w-8 h-8"${addAttribute(index + 1, "data-star-index")}>  <svg${addAttribute(`${baseStarClasses} star-empty text-gray-300`, "class")} fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg>  <svg${addAttribute(`${baseStarClasses} star-filled text-(--secondary-text-color)`, "class")} fill="currentColor" viewBox="0 0 24 24" style="clip-path: inset(0 100% 0 0);"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> </div>`)} </div> </article> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/meal_rating/MealRatingsInput.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/meal_rating/MealRatingsInput.astro", void 0);

const $$Astro$d = createAstro();
const $$MealInteractionButtonsContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$MealInteractionButtonsContainer;
  const {
    class: className,
    id,
    mealInteractionButtons = [],
    mealInteractionButtonText,
    dataAction
  } = Astro2.props;
  const { isLoggedIn } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="flex items-center justify-center gap-12 mt-4 md:justify-start"> ${mealInteractionButtons.length > 0 ? mealInteractionButtons.map((mealInteractionButton) => {
    return renderTemplate`${renderComponent($$result, "Button", $$Button, { "variant": "meal_interaction_button", "data-action": mealInteractionButton.dataAction, "class": "meal-interaction-button" }, { "default": async ($$result2) => renderTemplate` <i${addAttribute(`${mealInteractionButton.iconClass} text-2xl`, "class")}></i> <span class="text-md"> ${mealInteractionButton.mealInteractionButtonText} </span> ` })}`;
  }) : renderTemplate`<p>No available interactions</p>`} </article> <!-- Like Succes Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "liked_meal_dialog success", "isClosableDialog": true, "id": "liked_meal_success_dialog" }, { "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph" }, { "default": async ($$result3) => renderTemplate`
You can see your liked meals on your ${renderComponent($$result3, "Link", $$Link, { "variant": "dialog_link", "href": "/dashboard" }, { "default": async ($$result4) => renderTemplate`dashboard` })}.
` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "variant": "dialog_heading", "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Meal liked successfully!</h2> ` })}` })} <!-- Already Liked Meal --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "danger", "isClosableDialog": true, "id": "already_liked_meal_dialog" }, { "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph" }, { "default": async ($$result3) => renderTemplate`
You have already liked this meal. You can find it on your
${renderComponent($$result3, "Link", $$Link, { "variant": "dialog_link", "href": "/dashboard" }, { "default": async ($$result4) => renderTemplate`dashboard` })} ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "variant": "dialog_heading", "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Meal already liked</h2> ` })}` })} <!-- Comment Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "success", "isClosableDialog": true, "id": "comment_meal_dialog" }, { "form": async ($$result2) => renderTemplate`${renderComponent($$result2, "Form", $$Form, { "variant": "comment", "id": "comment_meal_form", "isDialogForm": true, "slot": "form" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "MealRatingsInput", $$MealRatingsInput, { "maxStars": 5 })} ` })}` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/MealInteractionButtonsContainer.astro?astro&type=script&index=0&lang.ts")} <!-- 
if (eventType === "UPDATE" && target) {
        target.dataset.commentTitle = payload.new.title
        target.dataset.commentBodyText = payload.new.body
        target.dataset.commentRating = payload.new.rating
      }

      if (eventType === "DELETE" && target) {
        target.remove()
      }
-->`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/MealInteractionButtonsContainer.astro", void 0);

const $$Astro$c = createAstro();
const $$MealInteractionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$MealInteractionSection;
  const { mealInteractionButtons } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "mt-6" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "MealInteractionButtonsContainer", $$MealInteractionButtonsContainer, { "mealInteractionButtons": mealInteractionButtons })} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/MealInteractionSection.astro", void 0);

const $$Astro$b = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Footer;
  const { class: className, id, variant } = Astro2.props;
  const footerVariants = {
    comment_card_footer: "mt-auto"
  };
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute(`${footerVariants[variant]}`, "class")}> ${renderSlot($$result, $$slots["default"])} </footer>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/footers/Footer.astro", void 0);

const $$Astro$a = createAstro();
const $$LikeButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$LikeButton;
  const { id, userId, commentId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "class": "like-button cursor-pointer", "id": "like_button", "data-user-id": userId, "data-comment-id": commentId }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<i class="fa-regular fa-thumbs-up"></i> ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/likes/LikeButton.astro", void 0);

const $$Astro$9 = createAstro();
const $$LikesCounter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$LikesCounter;
  const { class: className, id, likeAmount, userId, commentId } = Astro2.props;
  const currentLikesAmount = await countLikes(commentId);
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`like-counter-container flex gap-2 text-(--secondary-text-color) text-xl`, "class")}${addAttribute(userId, "data-comment-author-id")}${addAttribute(commentId, "data-comment-id")}> ${renderComponent($$result, "LikeButton", $$LikeButton, { "userId": userId, "commentId": commentId })} <span class="like-amount">${currentLikesAmount}</span> </article> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/likes/LikesCounter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/likes/LikesCounter.astro", void 0);

const $$Astro$8 = createAstro();
const $$MealRatingStars = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$MealRatingStars;
  const { class: className, id, ratingStars = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} rating-star-wrapper flex`, "class")}> ${ratingStars.length > 0 ? ratingStars.map((ratingStar) => renderTemplate`<i${addAttribute(ratingStar.class, "class")}></i>`) : ""} </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/meal_rating/MealRatingStars.astro", void 0);

const $$Astro$7 = createAstro();
const $$MealRatingsNumber = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$MealRatingsNumber;
  const { class: className, id, mealRatingNumber, maximumRatingNumber = 5 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} ratings-number-wrapper`, "class")}${addAttribute(id, "id")}> <span class="meal-rating-number" id="meal_rating_number">${mealRatingNumber}</span>
/
<span class="meal-maximum-rating-number" id="meal_maximum_rating_number">${maximumRatingNumber}</span> </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/meal_rating/MealRatingsNumber.astro", void 0);

const $$Astro$6 = createAstro();
const $$MealRatingContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$MealRatingContainer;
  const {
    class: className,
    id,
    starsCount = 0,
    mealRatingNumber,
    maximumRatingNumber
  } = Astro2.props;
  const maxStars = 5;
  const fullStars = Math.floor(mealRatingNumber);
  const hasHalfStar = mealRatingNumber % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  const ratingStars = [
    ...Array.from({ length: fullStars }, () => ({ class: "fas fa-star" })),
    ...hasHalfStar ? [{ class: "fas fa-star-half-alt" }] : [],
    ...Array.from({ length: emptyStars }, () => ({ class: "far fa-star" }))
  ];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} ratings flex gap-2 items-center text-(--secondary-text-color)`, "class")}${addAttribute(id, "id")}> ${renderComponent($$result, "MealRatingStars", $$MealRatingStars, { "ratingStars": ratingStars })} ${renderComponent($$result, "MealRatingsNumber", $$MealRatingsNumber, { "mealRatingNumber": mealRatingNumber, "maximumRatingNumber": maximumRatingNumber })} </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/MealRatingContainer.astro", void 0);

const $$Astro$5 = createAstro();
const $$LikesAndRatingsContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LikesAndRatingsContainer;
  const {
    class: className,
    id,
    likeAmount,
    starsCount,
    mealRatingNumber,
    maximumRatingNumber,
    userId,
    commentId
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} likes-and-ratings-container flex items-center justify-between`, "class")}${addAttribute(id, "id")}> ${renderComponent($$result, "LikesCounter", $$LikesCounter, { "userId": userId, "commentId": commentId, "likeAmount": likeAmount })} ${renderComponent($$result, "MealRatingContainer", $$MealRatingContainer, { "starsCount": starsCount, "mealRatingNumber": mealRatingNumber, "maximumRatingNumber": maximumRatingNumber })} </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/LikesAndRatingsContainer.astro", void 0);

const $$Astro$4 = createAstro();
const $$CommentCardBodyContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CommentCardBodyContainer;
  const { class: className = "", id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} comment-card-body-container`, "class")}${addAttribute(id, "id")} data-astro-cid-noghrshl> ${renderSlot($$result, $$slots["heading"])} <div data-astro-cid-noghrshl> <div class="paragraph-wrapper collapsed" data-astro-cid-noghrshl> ${renderSlot($$result, $$slots["paragraph"])} </div> ${renderSlot($$result, $$slots["actions"])} </div> </div>  ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/CommentCardBodyContainer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/CommentCardBodyContainer.astro", void 0);

const $$Astro$3 = createAstro();
const $$CommentCardsContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CommentCardsContainer;
  const { comments = [], mealId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col mt-12"> ${renderComponent($$result, "Heading", $$Heading, { "variant": "single_view_sub_heading" }, { "default": async ($$result2) => renderTemplate` <h2>Comments</h2> ` })} <div class="comments-section flex flex-wrap gap-7 mt-6"${addAttribute(mealId, "data-meal-id")}> ${comments.length > 0 ? comments.map((comment, index) => {
    return renderTemplate`${renderComponent($$result, "Card", $$Card, { "variant": "comment", "class": "comment-card group relative", "key": index, "id": `comment-${comment.id}`, "data-id": comment.id, "data-comment-title": comment.title, "data-comment-body-text": comment.body, "data-comment-rating": comment.rating, "data-updated-at": comment.updated_at }, { "default": async ($$result2) => renderTemplate` <div class="comment-action-buttons-container absolute -right-2 -top-4 flex gap-2 opacity-0 transition-opacity duration-150 ease-in group-hover:opacity-100"${addAttribute(comment.user.id, "data-comment-user-id")}> ${renderComponent($$result2, "Button", $$Button, { "variant": "comment_edit_button", "data-action": "edit-comment", "data-id": comment.id }, { "default": async ($$result3) => renderTemplate` <i class="fas fa-pencil-alt text-xl"></i> ` })} ${renderComponent($$result2, "Button", $$Button, { "variant": "comment_delete_button", "data-action": "delete-comment", "data-id": comment.id }, { "default": async ($$result3) => renderTemplate` <i class="fas fa-trash-alt"></i> ` })} </div> ${renderComponent($$result2, "Heading", $$Heading, { "variant": "comment_sub_heading" }, { "leading": async ($$result3) => renderTemplate`<img${addAttribute(comment.user.user_profile_image, "src")}${addAttribute(comment.user.user_name, "alt")} class="h-[100px] w-[100px] rounded-full">`, "title": async ($$result3) => renderTemplate`<div class="flex flex-col username-and-comment-time"> <div class="tracking-tighter mb-0.5"> <span class="username text-gray-400"> ${comment.user.user_name} </span> <p class="text-md text-(--secondary-text-color)">
Posted:
<span>${formatCommentPostDate(comment.created_at)}</span> </p> </div> ${comment.updated_at === null ? "" : renderTemplate`<p class="text-sm text-gray-400 mt-1 italic">
Edited:
<span> ${formatDate(
      comment.updated_at,
      "short",
      "numeric",
      "numeric"
    )} </span> </p>`} </div>` })} ${renderComponent($$result2, "CommentCardBodyContainer", $$CommentCardBodyContainer, {}, { "actions": async ($$result3) => renderTemplate`<button class="read-more-btn text-(--secondary-text-color) cursor-pointer" type="button" id="read_more_btn">
Read more
</button>`, "heading": async ($$result3) => renderTemplate`${renderComponent($$result3, "Heading", $$Heading, { "slot": "heading", "variant": "comment_heading" }, { "default": async ($$result4) => renderTemplate`${comment.title}` })}`, "paragraph": async ($$result3) => renderTemplate`<p>${comment.body}</p>` })} ${renderComponent($$result2, "Footer", $$Footer, { "variant": "comment_card_footer" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "LikesAndRatingsContainer", $$LikesAndRatingsContainer, { "likeAmount": comment.likeAmount, "starsCount": comment.rating, "mealRatingNumber": comment.rating, "maximumRatingNumber": comment.maximumRatingNumber, "userId": comment.user.id, "commentId": comment.id })} ` })} ` })}`;
  }) : renderTemplate`<p class="text-(--secondary-text-color)">No comments</p>`} </div> </div> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/CommentCardsContainer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/CommentCardsContainer.astro", void 0);

const $$Astro$2 = createAstro();
const $$CommentsSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CommentsSection;
  const { mealId: apiMealId, headingText, class: className, id } = Astro2.props;
  let internalMealId;
  try {
    internalMealId = await resolveApiMealIdToInternalMealId(apiMealId);
  } catch (error) {
    console.error("Failed to resolve internal meal ID: ", error);
  }
  const comments = internalMealId ? await fetchCommentsForSingleMeal(internalMealId) : [];
  console.log("Fetched comments: ", comments);
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": `${className} my-7`, "id": id }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "CommentCardsContainer", $$CommentCardsContainer, { "comments": comments, "mealId": internalMealId })} `, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "variant": "comment_heading", "slot": "title" }, { "default": async ($$result3) => renderTemplate`${headingText}` })}` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/CommentsSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/CommentsSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$SingleViewLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SingleViewLayout;
  const { meal, title, src, headingText, alt, target } = Astro2.props;
  const videoId = getYouTubeId(meal.strYoutube);
  const mealInteractionButtons = [
    {
      iconClass: "fa-solid fa-heart",
      mealInteractionButtonText: "Like",
      dataAction: "like"
    },
    {
      iconClass: "fa-solid fa-comment",
      mealInteractionButtonText: "Comment",
      dataAction: "comment"
    },
    {
      iconClass: "fa-solid fa-plus",
      mealInteractionButtonText: "Meal plan",
      dataAction: "add"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "variant": "single_view" }, { "background": ($$result3) => renderTemplate`${maybeRenderHead()}<img${addAttribute(src, "src")}${addAttribute(alt, "alt")} class="absolute inset-0 w-full h-full object-cover rounded-md">`, "backlink": ($$result3) => renderTemplate`${renderComponent($$result3, "Link", $$Link, { "slot": "backlink", "href": "/meals", "class": "text-white z-[10000] transition-text duration-150 ease-in hover:text-(--secondary-text-color)" }, { "default": ($$result4) => renderTemplate` <i class="fas fa-arrow-left"></i> ` })}`, "default": ($$result3) => renderTemplate`        <h2 class="text-white text-3xl md:text-4xl z-40 text-center"> ${headingText} </h2> `, "overlay": ($$result3) => renderTemplate`${renderComponent($$result3, "Overlay", $$Overlay, { "slot": "overlay", "class": "absolute inset-0 opacity-25 bg-dark/50" })}` })} ${renderComponent($$result2, "CookingInstructionSection", $$CookingInstructionSection, { "headingText": `What you need for ${meal.strMeal}`, "meal": meal, "ingredients": meal.ingredients, "videoId": videoId })}  ${renderComponent($$result2, "CommentsSection", $$CommentsSection, { "mealId": meal.idMeal })}  ${renderComponent($$result2, "MealInteractionSection", $$MealInteractionSection, { "mealInteractionButtons": mealInteractionButtons })}  ${renderComponent($$result2, "Dialog", $$Dialog, { "class": "comment-meal-dialog", "id": "meal_comment_dialog", "variant": "success" }, { "form": ($$result3) => renderTemplate`${renderComponent($$result3, "Form", $$Form, { "variant": "comment", "id": "submit_comment_form", "slot": "form" })}` })}  ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "edit_comment_dialog", "variant": "success", "isClosableDialog": true }, { "form": ($$result3) => renderTemplate`${renderComponent($$result3, "Form", $$Form, { "variant": "edit_comment", "id": "edit_comment_form", "slot": "form", "isDialogForm": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "MealRatingsInput", $$MealRatingsInput, { "maxStars": 5 })} ` })}` })}  ${renderComponent($$result2, "Dialog", $$Dialog, { "variant": "danger", "id": "confirm_delete_meal_comment_dialog", "isClosableDialog": true }, { "actions": ($$result3) => renderTemplate`<div class="action-buttons-container flex flex-col justify-center gap-4 md:flex-row"> ${renderComponent($$result3, "Button", $$Button, { "variant": "dialog_action_button", "class": "bg-red-400", "data-action": "delete-meal-comment", "id": "confirm_delete_meal_comment_button" }, { "default": ($$result4) => renderTemplate`
Delete Comment
` })} ${renderComponent($$result3, "Button", $$Button, { "variant": "dialog_action_button", "class": "bg-red-400", "id": "cancel_delete_meal_comment_button" }, { "default": ($$result4) => renderTemplate`
Cancel
` })} </div>`, "dialog-body-text": ($$result3) => renderTemplate`${renderComponent($$result3, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "delete_meal_comment_confirm_modal" }, { "default": ($$result4) => renderTemplate` <p class="text-white" id="delete_meal_comment_confirm_message"></p> ` })}`, "title": ($$result3) => renderTemplate`${renderComponent($$result3, "Heading", $$Heading, { "slot": "title" }, { "default": ($$result4) => renderTemplate` <h2>Confirm Comment Deletion</h2> ` })}` })} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/layouts/SingleViewLayout.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const singleMeal = await fetchSingleMealById(id);
  if (!singleMeal) {
    console.error("No meal found for ID:", id);
    return Astro2.redirect("/meals");
  }
  return renderTemplate`${renderComponent($$result, "SingleViewLayout", $$SingleViewLayout, { "title": singleMeal.strMeal, "src": singleMeal.strMealThumb, "headingText": singleMeal.strMeal, "alt": singleMeal.strMealAlternate || "Meal image is missing", "target": "_blank", "meal": singleMeal })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meals/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meals/[id].astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meals/[id].astro";
const $$url = "/meals/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
