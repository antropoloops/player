import React from "react";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../../api";
import MediaObject from "../../components/MediaObject";
import useLocale from "../../hooks/useLocale";

type Props = {};

const HomePage: React.FC<Props> = () => {
  const { data: sections } = useQuery("sections", () => API.sections.list());
  const { formatMessage: f } = useLocale();
  const home = sections && sections.find((section) => section.id === "home");
  return (
    <Layout>
      {home && <img src={home.image_url} />}
      {sections &&
        sections
          .filter((section) => section.home)
          .map((section) => (
            <MediaObject
              key={section.id}
              to={section.path || ""}
              image={section.image_url}
              alt={f(section.id.toUpperCase())}
            >
              <h3 className="font-normal mb-2">
                {f(section.id.toUpperCase())}
              </h3>
            </MediaObject>
          ))}
    </Layout>
  );
};

export default HomePage;
