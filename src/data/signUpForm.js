export default [
  {
    pages: [
      {
        title: "Sign Up",
        fields: [
          {
            id: "displayName",
            label: "Display Name",
            required: true,
            type: "text",
          },
          {
            id: "photoURL",
            label: "Photo URL",
            required: false,
            type: "text",
          },
          {
            id: "email",
            label: "Email address",
            required: true,
            type: "email",
          },
          {
            id: "password",
            label: "Password",
            required: true,
            type: "password",
          },
        ],
      },
    ],
  },
];
