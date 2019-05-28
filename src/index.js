import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./ui/AppLoader";
import version from "./version";
// import * as serviceWorker from "./serviceWorker";

console.log && console.log("Version", version);

ReactDOM.render(<App />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
