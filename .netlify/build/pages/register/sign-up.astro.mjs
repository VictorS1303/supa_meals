import { d as createComponent, e as createAstro, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ON6jawE_.mjs';
import { a as $$Layout, b as $$Link } from '../../chunks/Link_DemNDw7d.mjs';
import { $ as $$Form } from '../../chunks/Form_hu7zLN3U.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_Cm1wI2BO.mjs';
import { $ as $$Heading } from '../../chunks/Heading_CZ96zJT1.mjs';
import { $ as $$Paragraph } from '../../chunks/Paragraph_Bfh68Nk8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$SignUpForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignUpForm;
  const { headingText } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Form", $$Form, { "id": "sign_up_form", "variant": "sign_up" })} <!-- Sign Up Success Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "success", "id": "sign_up_success_dialog" }, { "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "sign-up-success-message" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<p class="text-white whitespace-pre-line text-center" id="sign_up_success_message"></p> ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Sign up successful</h2> ` })}` })} <!-- Sign Up Failed Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "danger", "id": "sign_up_failed_dialog", "isClosableDialog": true }, { "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "sign-up-failed-message" }, { "default": async ($$result3) => renderTemplate` <p class="text-white whitespace-pre-line text-center" id="sign_up_failed_dialog_message"></p> ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Sign up failed</h2> ` })}` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/forms/SignUpForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/forms/SignUpForm.astro", void 0);

const $$SignUp = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign up" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-center min-h-screen"> <div class="flex flex-col gap-5"> ${renderComponent($$result2, "Link", $$Link, { "slot": "backlink", "href": "/meals", "class": "self-start text-white text-xl transition-text duration-150 ease-in hover:text-(--secondary-text-color)" }, { "default": ($$result3) => renderTemplate` <i class="fas fa-arrow-left"></i> ` })} ${renderComponent($$result2, "SignUpForm", $$SignUpForm, {})} <h4 class="text-white mt-4 text-center">
Already a user? Log in
${renderComponent($$result2, "Link", $$Link, { "variant": "register_link", "href": "/register/login" }, { "default": ($$result3) => renderTemplate`here.` })} </h4> </div> </div> ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/register/sign-up.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/register/sign-up.astro";
const $$url = "/register/sign-up";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SignUp,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
