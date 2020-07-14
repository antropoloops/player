import React from "react";
import HtmlContent from "../components/HtmlContent";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import routes from "../routes";
import usePage from "../hooks/usePage";

const AboutPage = () => {
  const { data: page } = usePage("info");

  return (
    <Layout
      desktop={
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/team-large.jpg)" }}
        />
      }
      sidebar={
        page && (
          <HtmlContent className="p-4 text-white" content={page.content} />
        )
      }
    >
      <img
        className="w-full"
        width="360"
        height="360"
        alt="team"
        src="/talleres.jpg"
      />
      <div className="p-4 text-white">
        {page && <HtmlContent content={page.content} />}
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
