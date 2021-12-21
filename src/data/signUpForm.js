export default [
  {
    pages: [
      {
        title: "Sign Up",
        fields: [
          {
            id: "username",
            label: "Username",
            required: true,
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
