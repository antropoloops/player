import React from "react";
import { Spinner } from "./Spinner";

const Loading = () => {
  return (
    <div className="App">
      <div className="Header">
        <div className="play-logo">
          <img src="/play-logo.png" alt="Play antropoloops" />
        </div>
      </div>
      <div className="scroll">
        <div className="content">
          <div className="Spinner">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
