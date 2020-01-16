import React from "react";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";

const Loading = () => {
  return (
    <div className="App Loading">
      <Header />
      <Scroll />
      <div className="visuals welcome" />
    </div>
  );
};

export default Loading;
