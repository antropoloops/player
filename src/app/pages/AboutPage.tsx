import React from "react";
import { Markdown } from "../components/Markdown";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import routes from "../routes";
import usePage from "../hooks/usePage";

const AboutPage = () => {
  const { data: page } = usePage("info");

  return (
    <Layout
      desktop={<img className="w-full" alt="team" src="/talleres.jpg" />}
      sidebar={
        page && <Markdown className="p-4 text-white" markdown={page.content} />
      }
    >
      <img width="360" height="360" alt="team" src="/talleres.jpg" />
      <div className="p-4 text-white">
        {page && <Markdown markdown={page.content} />}
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

export default AboutPage;
