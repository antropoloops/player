import React from "react";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import MediaObject from "../components/MediaObject";
import useLocale from "../hooks/useLocale";
import Page from "../components/shared/PageDesktop";
import { useDeviceType } from "../hooks/useDeviceType";
import { ArrowRight } from "../components/Icons";
import HtmlContent from "../components/HtmlContent";
import { getSection, listSections } from "../@core/helpers/sectionHelpers";

type Props = {};

const HomePage: React.FC<Props> = () => {
  const { isMobile } = useDeviceType();
  const { data: page } = useQuery(
    ["page", { slug: "inicio", locale: "es" }],
    () => API.pages.get({ slug: "inicio", locale: "es" })
  );
  const { formatMessage: f } = useLocale();

  const sections = listSections();
  const home = getSection("home");

  return (
    <Layout logo={true} desktop={<Page page={page} />}>
      {home && (
        <img
          className="w-full shadow"
          width="768"
          height="432"
          alt={home.id}
          src={home.image_url}
        />
      )}
      {sections &&
        sections
          .filter((section) => section.home)
          .map((section) => (
            <MediaObject
              className="bg-gray-light group max-w-full hover:bg-gray-lighter"
              key={section.id}
              to={section.to}
              image={section.image_url}
              alt={f(section.id)}
            >
              <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
                <span className="flex-grow text-lg truncate">
                  {f(section.id)}
                </span>
                <ArrowRight className="text-white-dark flex-shrink-0 ml-2 my-2 group-hover:text-white" />
              </div>
            </MediaObject>
          ))}
      {isMobile && page && (
        <HtmlContent
          className="text-white bg-gray-medium p-4 mb-2"
          content={page.content}
        />
      )}
    </Layout>
  );
};

export default HomePage;
