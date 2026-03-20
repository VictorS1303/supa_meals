import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, j as renderComponent, k as renderScript, r as renderTemplate, l as renderSlot } from '../chunks/astro/server_ON6jawE_.mjs';
import { s as supabaseClient } from '../chunks/supabase_client_Ca1tTYuO.mjs';
import { f as fetchNotificationsAmount, a as fetchNotifications, $ as $$Section, b as fetchLikedMealsData } from '../chunks/Section_DdAP44KF.mjs';
import { f as formatGreeting, a as formatDate } from '../chunks/formatters_DA-I8caS.mjs';
import { $ as $$Heading } from '../chunks/Heading_CZ96zJT1.mjs';
import { $ as $$Button, a as $$Layout } from '../chunks/Link_DemNDw7d.mjs';
import 'clsx';
import { c as createSupabaseServerClient } from '../chunks/supabase_server_client_BGDSD7Cu.mjs';
import { $ as $$AuthenticateLockOverlayLayout } from '../chunks/AuthenticateLockOverlayLayout_BwB9PjTM.mjs';
import { $ as $$Dialog } from '../chunks/Dialog_Cm1wI2BO.mjs';
import { $ as $$Paragraph } from '../chunks/Paragraph_Bfh68Nk8.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$8 = createAstro();
const $$UserDashboardInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$UserDashboardInfo;
  const { class: className, id, src } = Astro2.props;
  formatGreeting();
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className}`, "class")}${addAttribute(id, "id")}> <div class="flex items-center gap-6"> <img${addAttribute(src, "src")} class="h-[100px] w-[100px] object-cover rounded-full" id="user_profile_image"> <div class="flex flex-col gap-3"> ${renderComponent($$result, "Heading", $$Heading, { "isDashboardHeading": true, "id": "dashboard_heading" })} ${renderComponent($$result, "Button", $$Button, { "isSignOutButton": true, "buttonText": "Sign out", "id": "sign_out_btn" })} </div> </div> </article> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/user_info/UserDashboardInfo.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/user_info/UserDashboardInfo.astro", void 0);

const $$Astro$7 = createAstro();
const $$NotificationButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NotificationButton;
  const { id, popovertarget, supabaseServerClient } = Astro2.props;
  const session = Astro2.locals.session;
  const currentUserId = session?.user?.id;
  console.log("SERVER - User ID:", currentUserId);
  console.log("SERVER - Has server client:", !!supabaseServerClient);
  const notificationsAmount = currentUserId && supabaseServerClient ? await fetchNotificationsAmount(currentUserId, supabaseServerClient) : 0;
  console.log("SERVER - Initial notifications amount:", notificationsAmount);
  console.log("SERVER - User ID:", currentUserId);
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "variant": "notification_button", "id": id, "popovertarget": "notifications_list", "anchor": "notifications-button" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<span class="notification-counter grid place-content-center absolute text-xs -right-[5px] -top-[3px] bg-(--notification-button-number-bg-color) h-[20px] w-[20px] p-[5px] rounded-full" id="notification_counter">${notificationsAmount}</span> <i class="fa-solid fa-bell"></i> ` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/buttons/NotificationButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/buttons/NotificationButton.astro", void 0);

const $$Astro$6 = createAstro();
const $$Popover = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Popover;
  const { class: className, popovertarget } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(className, "class")}${addAttribute(popovertarget, "id")}> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/popovers/Popover.astro", void 0);

// Format notifications heading text
const getNotificationText = (type, objectType) => {
  const messages = {
    like: `liked your ${objectType}`,
    comment: `comment on your ${objectType}`,
  };

  return messages[type] || `interacted with your ${objectType}`
};

// Get notifications lins
const getNotificationLink = (notification) => {
  const { target_object_type, target_object_id } = notification;

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
};

const $$Astro$5 = createAstro();
const $$NotificationsListPopover = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$NotificationsListPopover;
  const supabaseServerClient = createSupabaseServerClient(Astro2.cookies);
  const {
    data: { session },
    error: sessionError
  } = await supabaseServerClient.auth.getSession();
  const currentUserId = session?.user?.id;
  const notifications = currentUserId ? await fetchNotifications(supabaseServerClient, currentUserId) : [];
  return renderTemplate`${renderComponent($$result, "Popover", $$Popover, { "popovertarget": "notifications_list", "class": "notifications-list" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="notifications-list-popover bg-(--notifications-list-bg-color) border-2 border-(--secondary-text-color) h-[300px] max-w-[300px] w-full rounded-lg text-white overflow-scroll hidden z-[10000]"> ${notifications.length > 0 ? notifications.map((notification, index) => renderTemplate`<li${addAttribute(index, "key")} class="notification flex items-start gap-3 p-3 cursor-pointer border-b-2 border-(--secondary-text-color) last:border-0 hover:bg-white/10"> <a${addAttribute(getNotificationLink(notification), "href")} class="flex items-start gap-3 p-3 cursor-pointer block"${addAttribute(notification.id, "data-notification-id")}> <div class="flex flex-col gap-2"> <div class="flex flex-col items-start justify-between mb-3"> <p${addAttribute(`${!notification.is_read ? "text-(--secondary-text-color)" : ""} text-sm font-medium  whitespace-nowrap`, "class")}> ${notification.actor.user_name} ${getNotificationText(
    notification.interaction_type,
    notification.target_object_type
  )} </p> <div class="flex flex-col items-start gap-1"> <span class="text-xs text-gray-400"> ${formatDate(notification.created_at)} </span> </div> </div> <div class="flex justify-between w-full"> <div class="flex-1"> ${notification.target_object_type === "comment" ? renderTemplate`<p class="text-sm text-gray-500 truncate overflow-hidden text-ellipsis whitespace-normal mt-2"> <q class="block italic">${notification.comment.body}</q> </p>` : null} </div> ${!notification.is_read ? renderTemplate`<span class="self-center shrink-0 w-2 h-2 bg-(--secondary-text-color) rounded-full"></span>` : null} </div> </div> </a> </li>`) : renderTemplate`<li class="p-3 text-center text-sm text-gray-400">No notifications</li>`} </ul> ` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/popovers/NotificationsListPopover.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/popovers/NotificationsListPopover.astro", void 0);

const $$Astro$4 = createAstro();
const $$Notifications = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Notifications;
  const { class: className, notifications } = Astro2.props;
  const session = Astro2.locals.session;
  const supabaseServerClient = Astro2.locals.supabaseServerClient;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className} notifications-wrapper md:order-1`, "class")}> ${renderComponent($$result, "NotificationButton", $$NotificationButton, { "id": "notifications_button", "popovertarget": "notifications_list", "session": session, "supabaseServerClient": supabaseServerClient })} ${renderComponent($$result, "NotificationsListPopover", $$NotificationsListPopover, { "popovertarget": "notifications_list", "notifications": notifications })} </article> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/notifications/Notifications.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/notifications/Notifications.astro", void 0);

const $$Astro$3 = createAstro();
const $$UserInfoAndNotificationSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserInfoAndNotificationSection;
  const { class: className, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": `${className}`, "id": id }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "variant": "dashboard_heading" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<h2 id="greeting"></h2> ` })} <div class="flex flex-col gap-6 mt-8 md:flex-row md:justify-between"> <!-- Notifications --> ${renderComponent($$result2, "Notifications", $$Notifications, {})} <!-- User info --> ${renderComponent($$result2, "UserDashboardInfo", $$UserDashboardInfo, {})} </div> ` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/UserInfoAndNotificationSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/UserInfoAndNotificationSection.astro", void 0);

const $$Astro$2 = createAstro();
const $$LikedMealsContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LikedMealsContainer;
  const { class: className, id, likedMeals = [] } = Astro2.props;
  await fetchLikedMealsData();
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${className} liked-meals-container grid grid-cols-1 gap-5 md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]`, "class")}${addAttribute(id, "id")}></div> ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/LikedMealsContainer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/LikedMealsContainer.astro", void 0);

const $$Astro$1 = createAstro();
const $$LikedMealsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LikedMealsSection;
  const { likedMeals } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "class": "liked-meals-section", "id": "liked_meals_section" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Heading", $$Heading, { "variant": "dashboard_section_heading" }, { "default": ($$result3) => renderTemplate`Liked meals` })} ${renderComponent($$result2, "LikedMealsContainer", $$LikedMealsContainer, { "likedMeals": likedMeals })} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/sections/LikedMealsSection.astro", void 0);

const $$Astro = createAstro();
const $$DislikeMeal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DislikeMeal;
  const { dialogActionButtons = [] } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Dialog", $$Dialog, { "variant": "danger", "id": "confirm_delete_meal_dialog", "isClosableDialog": true }, { "actions": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="action-buttons-container flex justify-center gap-4"> ${renderComponent($$result2, "Button", $$Button, { "variant": "dialog_action_button", "class": "bg-red-400", "data-action": "delete-meal", "id": "confirm_delete_meal_button" }, { "default": async ($$result3) => renderTemplate`
Dislike Meal
` })} ${renderComponent($$result2, "Button", $$Button, { "variant": "dialog_action_button", "class": "bg-red-400", "id": "cancel_delete_meal_button" }, { "default": async ($$result3) => renderTemplate`
Cancel
` })} </div>`, "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "dislike_meal_confirm_modal" }, { "default": async ($$result3) => renderTemplate` <p class="text-white text-center" id="dislike_meal_confirm_message"></p> ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Dislike meal</h2> ` })}` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/dislike_meal/DislikeMeal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/dislike_meal/DislikeMeal.astro", void 0);

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const {
    data: { session }
  } = await supabaseClient.auth.getSession();
  session?.user;
  const authOptionLinks = [
    { buttonText: "Sign up", href: "/register/sign-up" },
    { buttonText: "Login", href: "/register/login" }
  ];
  const likedMeals = await fetchLikedMealsData();
  const dialogActionButtons = [
    {
      buttonText: "Delete meal",
      isDeleteDialogButton: true,
      id: "confirm_delete_meal_button",
      // required
      dataAction: "delete"
      // optional but expected
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="dashboard_content_wrapper" style="display:none;"> ${renderComponent($$result2, "UserInfoAndNotificationSection", $$UserInfoAndNotificationSection, {})} <div class="mt-12 flex flex-col gap-20"> ${renderComponent($$result2, "LikedMealsSection", $$LikedMealsSection, { "likedMeals": likedMeals })} </div> </div>  <div id="dashboard_lock_overlay_wrapper" style="display:block;"> ${renderComponent($$result2, "AuthenticateLockOverlayLayout", $$AuthenticateLockOverlayLayout, { "slot": "dashboard-lock", "id": "dashboard_authenticate_overlay_layout", "authOptionLinks": authOptionLinks })} </div> ${renderComponent($$result2, "DislikeMeal", $$DislikeMeal, { "dialogActionButtons": dialogActionButtons })} ` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
