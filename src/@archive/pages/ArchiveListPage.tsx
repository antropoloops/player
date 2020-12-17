import React from "react";
import { useCurrentGroup } from "../../@offline/hooks/useCurrentGroup";
import { ArrowRight } from "../../components/Icons";
import Layout from "../../components/layout/Layout";
import LoadingScreen from "../../components/LoadingScreen";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import { useListGroupArchives } from "../hooks/useArchiveQueries";

type Props = {};

const ArchiveListPage: React.FC<Props> = () => {
  const group = useCurrentGroup();
  const membership = {
    groupId: group?.id || "",
  };
  const { data: archives } = useListGroupArchives(membership);

  if (!archives) return <LoadingScreen />;

  return (
    <Layout>
      {archives.map((archive) => (
        <MediaObject
          key={archive.id}
          className="bg-gray-light group max-w-full hover:bg-gray-lighter"
          to={routes.archive(archive.id)}
          image="/images/sections/community.jpg"
          alt={archive.name}
        >
          <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
            <span className="flex-grow text-lg truncate">{archive.name}</span>
            <ArrowRight className="text-white-dark flex-shrink-0 ml-2 my-2 group-hover:text-white" />
          </div>
        </MediaObject>
      ))}
    </Layout>
  );
};

export default ArchiveListPage;
