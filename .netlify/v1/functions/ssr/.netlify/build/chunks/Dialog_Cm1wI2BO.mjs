import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, j as renderComponent, l as renderSlot, k as renderScript, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import { $ as $$Button } from './Link_DemNDw7d.mjs';
import { $ as $$Heading } from './Heading_CZ96zJT1.mjs';
import { $ as $$Paragraph } from './Paragraph_Bfh68Nk8.mjs';
/* empty css                        */

const $$Astro = createAstro();
const $$Dialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dialog;
  const {
    class: className = "",
    id,
    isClosableDialog = false,
    variant = "danger"
  } = Astro2.props;
  const baseDialogClasses = `
  fixed top-1/2 left-1/2
  -translate-x-1/2 -translate-y-1/2
  bg-(--modal-bg-color)
  min-w-[320px] max-w-[500px]
  px-8 py-4
  rounded-md border-2
  z-[10000000]
`;
  const borderVariants = {
    success: "border-(--secondary-text-color)",
    danger: "border-red-400",
    borderless: "border-0"
  };
  const openStateClasses = `
  [open]:top-[100%]
  [open]:left-1/2
`;
  const dialogVariants = {
    liked_meal_dialog: "text-white"
  };
  const variants = variant.split(" ");
  const borderClasses = variants.map((v) => borderVariants[v]).filter(Boolean).join(" ");
  const dialogClasses = variants.map((v) => dialogVariants[v]).filter(Boolean).join(" ");
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(id, "id")}${addAttribute(`
    ${baseDialogClasses}
    ${borderClasses}
    ${openStateClasses}
    ${dialogClasses}
    ${className}
  `, "class")} data-astro-cid-us42oih4> ${isClosableDialog ? renderTemplate`${renderComponent($$result, "Button", $$Button, { "variant": "dialog_close_button", "class": "dialog-close-button text-white", "data-astro-cid-us42oih4": true }, { "default": ($$result2) => renderTemplate` <i class="fas fa-times" data-astro-cid-us42oih4></i> ` })}` : null} <div class="flex flex-col h-full" data-astro-cid-us42oih4> <!-- HEADING - stays at top --> ${renderComponent($$result, "Heading", $$Heading, { "variant": "dialog_heading", "data-astro-cid-us42oih4": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["title"])} ` })} <!-- BODY --> <div class="flex-1 flex items-center justify-center w-full h-full my-8" data-astro-cid-us42oih4> ${renderSlot($$result, $$slots["form"])} ${renderComponent($$result, "Paragraph", $$Paragraph, { "variant": "dialog_paragraph", "data-astro-cid-us42oih4": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["dialog-body-text"])} ` })} </div> <!-- ACTIONS --> <div class="w-full" data-astro-cid-us42oih4> ${renderSlot($$result, $$slots["actions"])} </div> </div> </dialog>  ${renderScript($$result, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/dialogs/Dialog.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/dialogs/Dialog.astro", void 0);

export { $$Dialog as $ };
