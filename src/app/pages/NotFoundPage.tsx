import React from "react";
import { Link } from "react-router-dom";
import useAnalytics from "../hooks/useAnalytics";
import { Header } from "../shared/Header";

const NotFound = () => {
  useAnalytics();
  return (
    <div className="App NotFound">
      <Header />
      <div className="content">
        <div className="inside">
          <img src="/notfound.jpg" alt="Where to find" />
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