import React from "react";
import { Scroll } from "./shared/Scroll";

const Loading = () => {
  return (
    <div className="App Loading">
      <div className="header">
        <img
          className="play-logo"
          src="/play-logo.png"
          alt="Play antropoloops"
        />
      </div>
      <Scroll>
        <div className="footer">Loading...</div>
        <div className="visuals" />
      </Scroll>
    </div>
  );
};

export default Loading;
