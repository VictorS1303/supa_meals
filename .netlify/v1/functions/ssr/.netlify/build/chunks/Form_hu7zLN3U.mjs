import { d as createComponent, e as createAstro, m as maybeRenderHead, g as addAttribute, j as renderComponent, l as renderSlot, r as renderTemplate } from './astro/server_ON6jawE_.mjs';
import { $ as $$Heading } from './Heading_CZ96zJT1.mjs';
import { $ as $$Button } from './Link_DemNDw7d.mjs';

const formVariants = {
   sign_up:
   {
      headingText: "Sign up",

      inputs: [
        {
          type: "email",
          labelText: "E-mail",
          placeholder: "Enter e-mail",
          name: "email_input",
        },
        {
          type: "text",
          labelText: "Name",
          placeholder: "Enter full name",
          name: "full_name_input",
        },
        {
          type: "password",
          labelText: "Password",
          placeholder: "Enter password",
          name: "password_input",
        },
        {
          type: "password",
          labelText: "Repeat Password",
          placeholder: "Repeat password",
          name: "repeat_password_input",
        },
        {
          type: "file",
          labelText: "Profile image",
          name: "avatar_image_upload_input",
        },
      ],

      button:
      {
        text: 'Sign up',
        variant: 'form_button',
        type: 'submit'
      }
    },

  login:
  {
    headingText: 'Log In',
    inputs:
    [
      {
        type: "email",
        labelText: "E-mail",
        placeholder: "Enter e-mail",
        name: "email_input",
      },
      {
        type: "password",
        labelText: "Password",
        placeholder: "Enter password",
        name: "password_input",
      },
    ],

    button:
      {
        text: 'Log In',
        variant: 'form_button',
        type: 'submit'
      }
  },
 
  comment:
  {
    headingText: 'Comment',

    inputs:
    [
      {
        type: 'text',
        labelText: 'Comment title',
        placeholder: 'Enter comment title',
        name: 'comment_title_input',
      },
      {
        type: 'textarea',
        labelText: 'Comment text',
        placeholder: 'Enter comment text',
        name: 'comment_text_input'
      },
      {
        type: 'hidden',
        labelText: 'Rate meal',
        name: 'comment_rating_input',
      }
    ],

    button:
    {
      text: 'Comment',
      variant: 'form_button',
      type: 'submit'
    }
  },

  edit_comment:
  {
    headingText: 'Edit Comment',

    inputs:
    [
      {
        type: 'text',
        labelText: 'Comment title',
        placeholder: 'Enter comment title',
        name: 'comment_title_input',
      },
      {
        type: 'textarea',
        labelText: 'Comment text',
        placeholder: 'Enter comment text',
        name: 'comment_text_input'
      },
      {
        type: 'hidden',
        labelText: 'Rate meal',
        name: 'comment_rating_input',
      }
    ],

    button:
    {
      text: 'Submit',
      variant: 'form_button',
      type: 'submit'
    }
  },

 

};

const $$Astro = createAstro();
const $$Form = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Form;
  const { class: className = "", id, variant, isDialogForm = false } = Astro2.props;
  if (!variant) {
    throw new Error("Form component requires a `variant` prop");
  }
  const formConfig = formVariants[variant];
  if (!formConfig) {
    throw new Error(`Unknown form variant: ${variant}`);
  }
  const { inputs = [], headingText, button } = formConfig;
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(id, "id")}${addAttribute(variant, "data-variant")}${addAttribute(`${className} ${isDialogForm ? "border-0 bg-transparent" : "border-2 border-(--secondary-text-color)"} min-h-[350px] h-fit min-w-[300px] w-fit p-4 rounded-md`, "class")}> ${renderComponent($$result, "Heading", $$Heading, { "variant": "form_heading" }, { "default": ($$result2) => renderTemplate`${headingText ?? "No heading"}` })} ${inputs.length > 0 ? inputs.map((input) => renderTemplate`<div class="flex flex-col gap-2"> <label class="text-white ml-1">${input.labelText}</label> ${["text", "email", "password"].includes(input.type) && renderTemplate`<input${addAttribute(`${input.class ?? ""} block indent-[5px] border-b-2 border-white
            text-white w-full mb-6
            focus:ring-0 focus:outline-0`, "class")}${addAttribute(input.type, "type")}${addAttribute(input.placeholder, "placeholder")}${addAttribute(input.name, "name")}>`} ${input.type === "textarea" && renderTemplate`<textarea${addAttribute(input.name, "name")}${addAttribute(input.placeholder, "placeholder")}${addAttribute(input.rows ?? 4, "rows")}${addAttribute(`${input.class ?? ""} block p-2 border-b-2 border-white
            rounded-none text-white w-full h-fit mb-6
            focus:ring-0 focus:outline-0 bg-transparent resize-none`, "class")}></textarea>`} ${input.type === "file" && renderTemplate`<input type="file"${addAttribute(input.name, "name")} class="block w-full mb-6 text-(--secondary-text-color)
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm
            file:bg-(--secondary-text-color)
            file:text-white file:cursor-pointer hover:file:opacity-85">`} ${input.type === "hidden" && renderTemplate`<input type="hidden"${addAttribute(input.name, "name")}${addAttribute(input.value ?? "", "value")}>`} </div>`) : renderTemplate`<p>No inputs</p>`} ${renderSlot($$result, $$slots["default"])} ${button && renderTemplate`${renderComponent($$result, "Button", $$Button, { "type": button.type ?? "submit", "variant": button.variant }, { "default": ($$result2) => renderTemplate`${button.text}` })}`} </form>`;
}, "C:/Users/Victo/OneDrive/Desktop/Programmering/WebProjects/supa_meals/src/components/forms/Form.astro", void 0);

export { $$Form as $ };
