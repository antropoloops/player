import React from "react";
import "./Loading.css";
import { Scroll } from "./Scroll";
import { Spinner } from "./Spinner";

const Loading = () => {
  return (
    <div className="App Loading">
      {/** can't use Header component because uses Link */}
      <div className="Header">
        <div className="logo">
          <img
            className="play-logo"
            src="/play-logo.png"
            alt="Play antropoloops"
          />
        </div>
      </div>
      <Scroll>
        <div className="centered">
          <Spinner />
        </div>
      </Scroll>
      <div className="visuals" />
    </div>
  );
};

export default Loading;
