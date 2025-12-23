export const formVariants = {
   sign_in: {
    headingText: "Sign up",
    buttonText: "Sign up",
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
  },

  login:
  {
    headingText: 'Log In',
    buttonText: 'Log In',

    inputs: [
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
    ]
  }
}