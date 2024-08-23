import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./TodoHub.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // prettier-ignore
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);
