import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";

const title = "React with: ";
const tech = [
  "Babel",
  "Webpack 5",
  "Webpack dev server",
  "React Fast Refresh",
  "Eslint",
  "Prettier (from inside Eslint)",
  "Husky",
  "Gitlab CI/CD",
];

ReactDOM.render(
  <App title={title} tech={tech} />,
  document.getElementById("app")
);
