import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import "./reset.css";

export function createApp() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
