import React from "react";
import { Spinner } from "../components/Spinner";

const LoadingPage = React.memo(() => {
  return (
    <div className="App">
      <div className="Header">
        <div className="p-2">
          <img src="/play-logo.png" alt="Play antropoloops" />
        </div>
      </div>
      <div className="Content">
        <div className="flex flex-grow items-center justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  );
});

export default LoadingPage;
