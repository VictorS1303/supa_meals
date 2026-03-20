import { d as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_ON6jawE_.mjs';
import { a as $$Layout, b as $$Link } from '../chunks/Link_DemNDw7d.mjs';
import { $ as $$Hero, a as $$Overlay } from '../chunks/Overlay_B3oYg2tR.mjs';
import { $ as $$Paragraph } from '../chunks/Paragraph_Bfh68Nk8.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "variant": "landing" }, { "background": ($$result3) => renderTemplate`${maybeRenderHead()}<img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" alt="Delicious meal" class="absolute inset-0 w-full h-full object-cover">`, "default": ($$result3) => renderTemplate`    <h2 class="text-white text-3xl md:text-4xl z-40 text-center">SupaMeals</h2> ${renderComponent($$result3, "Paragraph", $$Paragraph, { "variant": "hero_paragraph" }, { "default": ($$result4) => renderTemplate`
The only place you need to go to find and plan your next meals.
` })} ${renderComponent($$result3, "Link", $$Link, { "variant": "hero_link", "href": "/meals" }, { "default": ($$result4) => renderTemplate` Browse meals ` })} `, "overlay": ($$result3) => renderTemplate`${renderComponent($$result3, "Overlay", $$Overlay, { "slot": "overlay" })}` })} ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/index.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
