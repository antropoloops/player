import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getAudioFormats from "./lib/audio/getAudioFormats";
// import * as serviceWorker from "./serviceWorker";
console.log("Audio support", getAudioFormats());

ReactDOM.render(<App />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
