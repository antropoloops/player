import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";

export function createApp() {
  ReactDOM.render(<Router />, document.getElementById("root"));
}
