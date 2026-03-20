import { d as createComponent, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ON6jawE_.mjs';
import { s as supabaseClient } from '../chunks/supabase_client_Ca1tTYuO.mjs';
import { a as $$Layout } from '../chunks/Link_DemNDw7d.mjs';
import { $ as $$AuthenticateLockOverlayLayout } from '../chunks/AuthenticateLockOverlayLayout_BwB9PjTM.mjs';
export { renderers } from '../renderers.mjs';

const $$MealPlanner = createComponent(async ($$result, $$props, $$slots) => {
  const {
    data: { session }
  } = await supabaseClient.auth.getSession();
  const user = session?.user;
  const isUserAuthenticated = !!user;
  const authOptionLinks = [
    { buttonText: "Sign up", href: "/register/sign-up" },
    { buttonText: "Login", href: "/register/login" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": isUserAuthenticated ? `${session.user.user_metadata.username}'s meal plan` : "You must be logged in" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="meal-plan-wrapper" style="display: none;"> <h3>Meal plan</h3> </div> <div class="auth-lock-overlay-wrapper" style="display: block;"> ${renderComponent($$result2, "AuthenticateLockOverlayLayout", $$AuthenticateLockOverlayLayout, { "id": "meal_planner_authenticate_overlay_layout", "authOptionLinks": authOptionLinks })} </div> ` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meal-planner.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meal-planner.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/meal-planner.astro";
const $$url = "/meal-planner";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MealPlanner,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
