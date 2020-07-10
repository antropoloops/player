import React, { useEffect } from "react";
import { ReactQueryConfigProvider } from "react-query";
import { autoUnlockAudio } from "../lib/active-audio-context";
import Router from "./Router";
import "./styles/tailwind.css";

const queryConfig = {
  // staleTime: 5 * 60 * 1000,
};

const App = () => {
  useEffect(() => {
    autoUnlockAudio();
  }, []);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router />
    </ReactQueryConfigProvider>
  );
};
export default App;
