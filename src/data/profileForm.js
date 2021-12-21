export default [
  {
    pages: [
      {
        title: "Profile",
        fields: [
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
          {
            id: "avatar",
            label: "Avatar",
            type: "text",
          },
        ],
      },
    ],
  },
];
