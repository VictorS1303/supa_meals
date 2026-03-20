import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$Paragraph = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Paragraph;
  const { class: className, id, variant = "" } = Astro2.props;
  const paragraphVariants = {
    hero_paragraph: "text-center text-lg text-white md:text-xl min-w-[300px]",
    card_paragraph: "mb-8 line-clamp-4",
    dialog_paragraph: "inline text-center justify-center text-white"
  };
  const variants = variant.split(" ");
  const appliedClasses = variants.map((v) => paragraphVariants[v]).filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(`${appliedClasses} ${className}`, "class")}${addAttribute(id, "id")}> ${renderSlot($$result, $$slots["default"])} </p>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/paragraphs/Paragraph.astro", void 0);

export { $$Paragraph as $ };
