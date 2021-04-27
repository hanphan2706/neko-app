import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./style.css";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

render(<App />, document.getElementById("app"));
