import React from "react";
import { ArrowRight } from "../../components/Icons";
import Layout from "../../components/layout/Layout";
import MediaObject from "../../components/MediaObject";
import useLocale from "../../hooks/useLocale";
import routes from "../../routes";

type Props = {};

const ArchiveListPage: React.FC<Props> = () => {
  const { formatMessage: f } = useLocale();
  const section = {
    id: "yours",
    to: routes.archive("local"),
    image_url: "",
  };
  return (
    <Layout>
      <MediaObject
        className="bg-gray-light group max-w-full hover:bg-gray-lighter"
        to={routes.archiveOffline()}
        image="/images/sections/community.jpg"
        alt={f(section.id)}
      >
        <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
          <span className="flex-grow text-lg truncate">{f(section.id)}</span>
          <ArrowRight className="text-white-dark flex-shrink-0 ml-2 my-2 group-hover:text-white" />
        </div>
      </MediaObject>
    </Layout>
  );
};

export default ArchiveListPage;
