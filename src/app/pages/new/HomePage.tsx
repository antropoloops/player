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
    <Layout logo={true}>
      {home && <img alt={home.id} src={home.image_url} />}
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
              <div className="flex flex-col justify-center p-2 group">
                <h3 className="font-normal group-hover:text-green">
                  {f(section.id.toUpperCase())}
                </h3>
              </div>
            </MediaObject>
          ))}
    </Layout>
  );
};

export default HomePage;
