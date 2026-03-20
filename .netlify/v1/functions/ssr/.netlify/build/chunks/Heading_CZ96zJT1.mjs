import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$Heading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Heading;
  const {
    class: className = "",
    id,
    variant = "default"
    // hero | card | singleViewHero | singleViewSub | dashboard | dashboardSection | likedMealCard | form | dashboardLock | dialog | comment | commentSub
  } = Astro2.props;
  const variantClasses = {
    default: "",
    hero: "text-white text-4xl md:text-6xl whitespace-nowrap",
    card: "text-[var(--primary-text-color)] text-lg uppercase font-semibold tracking-wide mt-3 mb-2",
    meal_card: "text-[var(--primary-text-color)] text-xl my-2 font-bold",
    single_view_hero_heading: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl z-[10000] md:text-4xl text-center",
    single_view_sub_heading: "text-[var(--singleview-subheading-text-color)] text-3xl",
    dashboard_heading: "text-[var(--singleview-subheading-text-color)] text-2xl",
    dashboard_section_heading: "text-[var(--singleview-subheading-text-color)] mb-3 text-3xl",
    liked_meal_card_heading: "absolute -bottom-[210px] h-full w-full text-center bg-white text-var(--secondary-text-color) px-2 py-2 transition-all duration-200 ease-in-out group-hover:-bottom-[80px]",
    form_heading: "mt-4 mb-8 text-center text-white text-2xl uppercase",
    dashboard_lock_heading: "text-white text-2xl text-center uppercase whitespace-normal md:text-4xl",
    dialog_heading: "text-white text-3xl text-center uppercase mt-4 whitespace-normal",
    comment_heading: "mb-1 flex items-center gap-4 text-(--secondary-text-color) text-xl",
    comment_sub_heading: "flex flex-col gap-4 text-lg text-(--secondary-text-color) mb-2 md:flex-row md:items-center"
  };
  return renderTemplate`${maybeRenderHead()}<header${addAttribute(`${variantClasses[variant]} ${className}`, "class")}${addAttribute(id, "id")}> ${renderSlot($$result, $$slots["leading"])} ${renderSlot($$result, $$slots["title"])} ${renderSlot($$result, $$slots["trailing"])} ${renderSlot($$result, $$slots["default"])} </header>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/headings/Heading.astro", void 0);

export { $$Heading as $ };
