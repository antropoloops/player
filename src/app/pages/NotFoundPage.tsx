import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import Layout from "../components/layout/Layout";
import { useDeviceType } from "../hooks/useDeviceType";

const NotFoundPage = () => {
  const { isMobile } = useDeviceType();
  return (
    <Layout
      desktop={
        <div className="h-full flex items-center justify-center">
          <img src="/notfound.jpg" alt="Where to find" />
        </div>
      }
    >
      {isMobile && <img src="/notfound.jpg" alt="Where to find" />}
      <div className="p-4 text-white Markdown">
        <p>Lo sentimos, no hemos encontrado lo que buscabas.</p>
        <p>
          Si crees que algo va mal, por favor escríbenos a:{" "}
          <a href="mailto:hola@antropoloops.com">hola@antropoloops.com</a>
        </p>
      </div>
      <div className="my-8 flex justify-center">
        <Link
          className="py-2 px-4 rounded-full bg-gray-light text-white"
          to={routes.root()}
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
