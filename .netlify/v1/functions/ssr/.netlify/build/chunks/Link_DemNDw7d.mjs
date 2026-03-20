import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, l as renderSlot, r as renderTemplate, j as renderComponent, k as renderScript, n as renderHead } from './astro/server_ON6jawE_.mjs';
/* empty css                        */
import 'clsx';

const $$Astro$4 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    class: className,
    id,
    variant,
    isClosableDialog = false,
    ...rest
  } = Astro2.props;
  const baseButtonClasses = `cursor-pointer`;
  const buttonVariants = {
    sign_out_button: "bg-(--secondary-text-color) p-2 text-sm rounded-md text-white w-fit ",
    notification_button: "relative grid place-content-center my-4 bg-(--notification-button-bg-color) text-(--notification-button-text-color) shadow-md h-[40px] w-[40px] p-4 rounded-full cursor-pointer",
    form_button: "form-button relative overflow-hidden bg-(--secondary-text-color) h-fit w-full text-center text-white py-1 uppercase rounded-md my-2 cursor-pointer transition-opacity duration-150 ease-in hover:opacity-95",
    dialog_action_button: "dialog-action-button px-4 py-2 rounded-md text-white w-full",
    meal_interaction_button: "disabled-interaction-button meal-interaction-button flex flex-col text-[var(--secondary-text-color)] cursor-pointer transition-opacity duration-150 ease-in hover:opacity-85",
    dialog_close_button: "fixed top-3 right-3 text-2xl",
    comment_edit_button: "bg-(--secondary-text-color) grid place-content-center h-9 w-9 rounded-full text-white cursor-pointer transition-all duration-150 ease-in hover:opacity-95 hover:shadow-md",
    comment_delete_button: "bg-red-400 grid place-content-center h-9 w-9 rounded-full text-white cursor-pointer transition-all duration-150 ease-in hover:opacity-95 hover:shadow-md"
  };
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(id, "id")}${addAttribute(`${baseButtonClasses} ${buttonVariants[variant] ?? ""} ${className ?? ""}`, "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </button>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/buttons/Button.astro", void 0);

const $$Astro$3 = createAstro();
const $$NavToggleButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$NavToggleButton;
  const { class: className, id } = Astro2.props;
  const hideOnRoutes = [/^\/meals\/[^/]+$/, /^\/dashboard/];
  const pathname = typeof window !== "undefined" ? window.location.pathname : Astro2.url.pathname;
  const hiddenClass = hideOnRoutes.some((routes) => routes.test(pathname)) && "hidden";
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "class": `h-[30px] w-[30px] fixed top-12 right-12 cursor-pointer group ${hiddenClass} group-hover`, "id": "nav_toggle_button", "data-astro-cid-5bwlf3eu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<span class="absolute left-0 right-0 mx-auto block h-[5px] w-full rounded-md bg-white
         -translate-y-[9px] transform
         group-[.open]:translate-y-0 group-[.open]:rotate-45
         transition-all duration-200 ease-in group-hover:bg-(--secondary-text-color)" data-astro-cid-5bwlf3eu></span> <span class="absolute left-0 right-0 mx-auto block h-[5px] w-full rounded-md bg-white
         translate-y-0 transform
         group-[.open]:opacity-0 group-[.open]:-translate-x-[40px]
         transition-all duration-150 ease-in delay-100 group-hover:bg-(--secondary-text-color)" data-astro-cid-5bwlf3eu></span> <span class="absolute left-0 right-0 mx-auto block h-[5px] w-full rounded-md bg-white
         translate-y-[9px] transform
         group-[.open]:translate-y-0 group-[.open]:-rotate-45
         transition-all duration-200 ease-in group-hover:bg-(--secondary-text-color)" data-astro-cid-5bwlf3eu></span> ` })}  ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/buttons/NavToggleButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/buttons/NavToggleButton.astro", void 0);

const $$Astro$2 = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const {
    class: className,
    id,
    navItems = [],
    isLoggedIn,
    showToggleButton
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(`${className} main-nav fixed bg-transparent inset-0 bg-[var(--navigation-bg-color)] z-[1000000]
            transition-[clip-path] duration-500 ease-in-out`, "class")} id="main_nav" data-astro-cid-cf5drfxn> ${showToggleButton ? renderTemplate`${renderComponent($$result, "NavToggleButton", $$NavToggleButton, { "data-astro-cid-cf5drfxn": true })}` : null} <span class="absolute
        top-1/2
        left-1/2
        text-center
        text-[8vw]
        px-4
        uppercase
        font-bold
        w-screen
        whitespace-nowrap
        tracking-[.2em]
        opacity-0
        transition-opacity
        duration-300
        pointer-events-none hidden md:block" style="color: var(--secondary-text-color);" id="navigation_bg_text" data-astro-cid-cf5drfxn></span> <ul class="flex flex-col items-center justify-center h-full gap-7 z-[10000]" data-astro-cid-cf5drfxn> ${navItems.map((navItem, index) => renderTemplate`<li${addAttribute(index, "key")} class="nav-list-item uppercase text-4xl" data-astro-cid-cf5drfxn> <a${addAttribute(navItem.href, "href")}${addAttribute(navItem.text, "data-bg-text")}${addAttribute(navItem.isRequiringAuth ? "true" : "false", "data-requires-auth")} data-astro-cid-cf5drfxn> ${navItem.text} </a> </li>`)} <a href="/dashboard" data-astro-cid-cf5drfxn> <img class="absolute bottom-5 left-[50%] -translate-x-[50%] h-[60px] w-[60px] object-cover rounded-full border-2 border-(--secondary-text-color) cursor-pointer transition-opacity duration-100 ease-in hover:opacity-90" id="user_nav_avatar" data-astro-cid-cf5drfxn> </a> </ul> </nav>  ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/navigation/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/navigation/Navigation.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, isDashboardLockVisible = false } = Astro2.props;
  const isLandingView = Astro2.url.pathname === "/";
  const isMealsView = Astro2.url.pathname.startsWith("/meals");
  const isSingleMealView = /^\/meals\/[^/]+$/.test(Astro2.url.pathname);
  const isDashboardView = Astro2.url.pathname.startsWith("/dashboard");
  const isAuthView = Astro2.url.pathname.startsWith("/register/sign-up") || Astro2.url.pathname.startsWith("/register/login");
  const showToggleButton = !isAuthView && !isSingleMealView && !isDashboardView;
  const mainClasses = isLandingView ? "p-0" : isSingleMealView || isDashboardView || isMealsView ? "mx-auto p-6" : "";
  const navItems = [
    {
      href: "/meals",
      text: "Meals",
      isRequiringAuth: false
    },
    {
      href: "/meal-planner",
      text: "Meal Planner",
      isRequiringAuth: true
    },
    {
      href: "/register/sign-up",
      text: "Sign Up",
      isRequiringAuth: true
    },
    {
      href: "/register/login",
      text: "Log In",
      isRequiringAuth: true
    }
  ];
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/src/styles/global.css">', '<script src="https://kit.fontawesome.com/e05f21b32e.js" crossorigin="anonymous"><\/script><title id="page_title">SupaMeals | ', "</title>", '</head> <body class="bg-[var(--secondary-bg-color)] min-h-screen"> ', " <main", "> ", " </main> ", " </body></html>"])), renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"), title, renderHead(), renderComponent($$result, "Navigation", $$Navigation, { "navItems": navItems, "showToggleButton": showToggleButton }), addAttribute(mainClasses, "class"), renderSlot($$result, $$slots["default"]), isDashboardLockVisible && renderTemplate`${renderSlot($$result, $$slots["dashboard-lock"])}`);
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Link;
  const { class: className, id, href, target, variant } = Astro2.props;
  const baseLinkClasses = "cursor-pointer";
  const linkVariants = {
    single_view_link: "absolute top-3 left-3 text-[var(--secondary-text-color)] text-2xl text-white z-[100001] cursor-pointer transition-text duration-150 ease-in hover:text-[var(--secondary-text-color)]",
    register_link: "text-white border-b-2 border-white transition-all duration-100 ease-in hover:text-(--secondary-text-color) hover:border-(--secondary-text-color)",
    meal_card_link: "bg-(--secondary-text-color) mt-auto w-fit py-2 px-4 text-white rounded-md transition-opacity duration-150 hover:opacity-90",
    pagination_link: "prev-btn flex items-center gap-2 px-4 py-2 bg-(--secondary-text-color) text-white rounded-md",
    back_to_meal_overview_link: "absolute top-3 left-3 text-(--secondary-text-color) text-2xl cursor-pointer",
    dashbord_overlay_link: "text-white bg-(--secondary-text-color) px-4 py-3 rounded-md text-xl cursor-pointer transition-opacity duration-150 ease-in hover:opacity-85",
    hero_link: "block bg-(--secondary-text-color) mt-3 mx-auto w-fit py-2 px-4 text-white rounded-md transition-opacity duration-150 hover:opacity-90",
    dialog_link: "inline underline decoration-dotted decoration-2 hover:decoration-solid"
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(target, "target")}${addAttribute(`${baseLinkClasses} ${linkVariants[variant]} ${className}`, "class")}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/links/Link.astro", void 0);

export { $$Button as $, $$Layout as a, $$Link as b };
