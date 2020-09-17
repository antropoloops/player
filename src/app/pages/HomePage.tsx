import React from "react";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import MediaObject from "../components/MediaObject";
import useLocale from "../hooks/useLocale";
import Page from "../components/pages/PageDesktop";
import { useDeviceType } from "../hooks/useDeviceType";
import { ArrowRight } from "../components/Icons";
import HtmlContent from "../components/HtmlContent";

type Props = {};

const HomePage: React.FC<Props> = () => {
  const { isMobile } = useDeviceType();
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
          className="bg-gray-medium group max-w-full"
          key={section.id}
          to={section.to}
          image={section.image_url}
          alt={f(section.id)}
        >
          <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
            <span className="flex-grow text-lg truncate">{f(section.id)}</span>
            <ArrowRight className="text-gray-light flex-shrink-0 ml-2 my-2 group-hover:text-white-dark" />
          </div>
        </MediaObject>
      ));

  return (
    <Layout logo={true} desktop={<Page page={page} />}>
      <div className="sidebar sm:pr-3">
        {home && (
          <img
            className="w-full mb-2"
            width="768"
            height="432"
            alt={home.id}
            src={home.image_url}
          />
        )}
        {sectionList}
        {isMobile && page && (
          <HtmlContent
            className="text-white bg-gray-medium p-4 mb-2"
            content={page.content}
          />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;