import React, { useEffect } from "react";
import { autoUnlockAudio } from "../lib/active-audio-context";
import Router from "./Router";
import "./styles/tailwind.css";

const App = () => {
  useEffect(() => {
    autoUnlockAudio();
  }, []);

  return <Router />;
};
export default App;
