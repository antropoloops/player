import React from "react";
import { ReactQueryConfigProvider } from "react-query";
import Router from "./Router";
import "./styles/tailwind.css";

const queryConfig = {
  // staleTime: 5 * 60 * 1000,
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router />
    </ReactQueryConfigProvider>
  );
};
export default App;
