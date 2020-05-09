import React from "react";
import { Spinner } from "./Spinner";

export const Loading = React.memo(() => {
  return (
    <div className="App">
      <div className="Header">
        <div className="logo">
          <img src="/play-logo.png" alt="Play antropoloops" />
        </div>
      </div>
      <div className="scroll">
        <div className="content">
          <Spinner center="full" />
        </div>
      </div>
    </div>
  );
});