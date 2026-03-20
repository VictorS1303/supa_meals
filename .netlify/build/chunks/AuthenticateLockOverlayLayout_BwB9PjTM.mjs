import { d as createComponent, e as createAstro, m as maybeRenderHead, j as renderComponent, r as renderTemplate, g as addAttribute } from './astro/server_ON6jawE_.mjs';
import { $ as $$Heading } from './Heading_CZ96zJT1.mjs';
import { b as $$Link } from './Link_DemNDw7d.mjs';

const $$Astro$2 = createAstro();
const $$AuthOptionLinksContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AuthOptionLinksContainer;
  const { authOptionLinks = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex-gap-6"> ${authOptionLinks.length > 0 ? authOptionLinks.map((authOptionLink) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "variant": "dashboard_overlay_link", "href": authOptionLink.href }, { "default": ($$result2) => renderTemplate`${authOptionLink.buttonText}` })}`) : renderTemplate`<p class="text-white">No auth links available</p>`} </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/AuthOptionLinksContainer.astro", void 0);

const $$Astro$1 = createAstro();
const $$AuthOptionsContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AuthOptionsContainer;
  const { class: className, id, authOptionLinks = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="auth-options-container flex flex-wrap gap-4 justify-center" id="auth_options_container"> ${renderComponent($$result, "AuthOptionLinksContainer", $$AuthOptionLinksContainer, { "authOptionLinks": authOptionLinks })} </div>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/containers/AuthOptionsContainer.astro", void 0);

const $$Astro = createAstro();
const $$AuthenticateLockOverlayLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthenticateLockOverlayLayout;
  const { class: className, id, authOptionLinks = [] } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`${className} grid place-content-center absolute top-0 left-0 h-screen w-screen backdrop-blur-3xl z-[10000000]`, "class")}${addAttribute(id, "id")}> <div class="flex flex-col gap-6"> ${renderComponent($$result, "Heading", $$Heading, { "variant": "dashboard_lock_heading" }, { "default": ($$result2) => renderTemplate` You must be logged in ` })} ${renderComponent($$result, "AuthOptionsContainer", $$AuthOptionsContainer, { "authOptionLinks": authOptionLinks })} </div> </article>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/layouts/AuthenticateLockOverlayLayout.astro", void 0);

export { $$AuthenticateLockOverlayLayout as $ };
