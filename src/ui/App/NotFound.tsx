import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../shared/Header";

const NotFound = () => {
  return (
    <div className="App NotFound">
      <Header />
      <div className="content">
        <div className="inside">
          <img
            width="500"
            height="500"
            src="https://66.media.tumblr.com/dbe92884e2815033868d3384fea3053a/tumblr_oyjmykm6Y01sdkrqjo1_500.gif"
            alt="Fuentes musicales"
          />
          <p>Lo sentimos, no hemos encontrado lo que buscabas.</p>
          <p>
            Si crees que algo va mal, por favor escríbenos a
            hola@antropoloops.com
          </p>
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
