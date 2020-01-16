import React from "react";
import { Header } from "./Header";
import "./Loading.css";
import { Scroll } from "./Scroll";
import { Spinner } from "./Spinner";

const Loading = () => {
  return (
    <div className="App Loading">
      <Header />
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
