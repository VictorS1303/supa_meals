import { d as createComponent, j as renderComponent, k as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ON6jawE_.mjs';
import { $ as $$Button, a as $$Layout, b as $$Link } from '../../chunks/Link_DemNDw7d.mjs';
import { s as supabaseClient } from '../../chunks/supabase_client_Ca1tTYuO.mjs';
import { $ as $$Form } from '../../chunks/Form_hu7zLN3U.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_Cm1wI2BO.mjs';
import { $ as $$Heading } from '../../chunks/Heading_CZ96zJT1.mjs';
import { $ as $$Paragraph } from '../../chunks/Paragraph_Bfh68Nk8.mjs';
export { renderers } from '../../renderers.mjs';

const $$LoginForm = createComponent(async ($$result, $$props, $$slots) => {
  const {
    data: { user }
  } = await supabaseClient.auth.getUser();
  user?.user_metadata.username;
  return renderTemplate`${renderComponent($$result, "Form", $$Form, { "variant": "login", "id": "login_form" })} <!-- Login Success Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "success", "id": "login_success_dialog", "isClosableDialog": true }, { "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "login-success-message" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<p class="text-white text-center tracking-wide whitespace-pre-line" id="login_success_message"></p> ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "slot": "dialog-body-text", "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Login successful</h2> ` })}` })} <!-- Login Failed Dialog --> ${renderComponent($$result, "Dialog", $$Dialog, { "variant": "danger", "id": "login_failed_dialog", "isDialogCloseButton": true, "isClosableDialog": true }, { "default": async ($$result2) => renderTemplate`   ${renderComponent($$result2, "Button", $$Button, { "variant": "dialog_close_button" }, { "default": async ($$result3) => renderTemplate` <i class="fas fa-times"></i> ` })} `, "dialog-body-text": async ($$result2) => renderTemplate`${renderComponent($$result2, "Paragraph", $$Paragraph, { "slot": "dialog-body-text", "variant": "dialog_paragraph", "data-role": "login-failed-message" }, { "default": async ($$result3) => renderTemplate` <p class="text-white text-center tracking-wide whitespace-pre-line" id="login_failed_message"></p> ` })}`, "title": async ($$result2) => renderTemplate`${renderComponent($$result2, "Heading", $$Heading, { "slot": "dialog-body-text", "slot": "title" }, { "default": async ($$result3) => renderTemplate` <h2>Login failed</h2> ` })}` })} ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/forms/LoginForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/forms/LoginForm.astro", void 0);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Log In" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-center min-h-screen"> <div class="flex flex-col gap-5"> ${renderComponent($$result2, "Link", $$Link, { "slot": "backlink", "href": "/meals", "class": "self-start text-white text-xl transition-text duration-150 ease-in hover:text-(--secondary-text-color)" }, { "default": ($$result3) => renderTemplate` <i class="fas fa-arrow-left"></i> ` })} ${renderComponent($$result2, "LoginForm", $$LoginForm, {})} <h4 class="text-white mt-4 text-center">
Not already a user? Register
${renderComponent($$result2, "Link", $$Link, { "variant": "register_link", "href": "/register/sign-up" }, { "default": ($$result3) => renderTemplate`here.` })} </h4> </div> </div> ` })}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/register/login.astro", void 0);

const $$file = "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/pages/register/login.astro";
const $$url = "/register/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
