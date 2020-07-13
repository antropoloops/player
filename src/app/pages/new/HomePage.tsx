import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import MediaObject from "../../components/MediaObject";
import useLocale from "../../hooks/useLocale";
import { Readme } from "../../components/Player/Readme";
import Page from "../../components/pages/PageDesktop";

type Props = {};

const HomePage: React.FC<Props> = () => {
  const { data: sections } = useQuery("sections", () => API.sections.list());
  const { data: page } = useQuery(
    ["page", { slug: "inicio", locale: "es" }],
    (_, params) => API.pages.get(params)
  );
  const { formatMessage: f } = useLocale();
  const home = sections && sections.find((section) => section.id === "home");

  const sectionList =
    sections &&
    sections
      .filter((section) => section.home)
      .map((section) => (
        <MediaObject
          key={section.id}
          to={section.to}
          image={section.image_url}
          alt={f(section.id)}
        >
          <div className="flex flex-col justify-center p-2 group">
            <h3 className="font-normal group-hover:text-green">
              {f(section.id)}
            </h3>
          </div>
        </MediaObject>
      ));

  return (
    <Layout
      logo={true}
      desktop={<Page page={page} />}
      sidebar={
        <>
          {home && <img alt={home.id} src={home.image_url} />}
          {sectionList}
        </>
      }
    >
      {home && <img alt={home.id} src={home.image_url} />}
      {page && <Readme className="bg-gray-medium p-4" content={page.content} />}
      {sectionList}
    </Layout>
  );
};

export default HomePage;
