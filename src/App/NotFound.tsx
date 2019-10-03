import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="App NotFound">
      <div className="header">
        <img
          className="play-logo"
          src="/play-logo.png"
          alt="Play antropoloops"
        />
      </div>
      <div className="content">
        <div className="inside">
          <p>Lo sentimos, no hemos encontrado lo que buscabas.</p>
          <p>
            Si crees que algo va mal, por favor escríbenos a
            hola@antropoloops.com
          </p>
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
      <div className="footer">Not Found</div>
      <div className="visuals" />
    </div>
  );
};

export default NotFound;
