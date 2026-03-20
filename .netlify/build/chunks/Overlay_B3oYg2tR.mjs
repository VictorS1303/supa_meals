import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import 'clsx';

const $$Astro$1 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const { class: className, id, variant = "single_view" } = Astro2.props;
  const baseHeroClasses = "relative overflow-hidden";
  const heroVariants = {
    landing: "h-screen w-screen",
    single_view: "mb-3 h-[300px] w-full",
    default: "h-screen max-h-[300px] w-full"
  };
  const heroClass = `${baseHeroClasses} ${heroVariants[variant]} ${className ?? ""}`;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(heroClass, "class")}> <!-- Background slot --> ${renderSlot($$result, $$slots["background"])} <!-- Overlay slot --> ${renderSlot($$result, $$slots["overlay"])} <!-- Backlink slot --> ${variant === "single_view" && renderTemplate`<div class="absolute top-4 left-4 z-20 text-xl "> ${renderSlot($$result, $$slots["backlink"])} </div>`} <!-- Centered content slot --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 text-center"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/heroes/Hero.astro", void 0);

const $$Astro = createAstro();
const $$Overlay = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Overlay;
  const { class: className, id, variants } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="absolute inset-0 bg-black/50 z-10 rounded-md"> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/overlays/Overlay.astro", void 0);

export { $$Hero as $, $$Overlay as a };
