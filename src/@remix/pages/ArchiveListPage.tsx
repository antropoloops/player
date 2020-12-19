import React from "react";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import { useObserveList } from "../../@backend/hooks/useObserveModel";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import { Project, ProjectType } from "../../models";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import Layout from "../../components/layout/Layout";
import { Separator } from "../../@core/components";

type Props = {
  className?: string;
};

export default function ArchiveListPage({ className }: Props) {
  const group = useCurrentGroup();

  const { data: archives } = useObserveList(Project, (c) =>
    c.type("eq", ProjectType.ARCHIVE)
  );

  if (!group) return <NotAuthorizedPage />;

  return (
    <Layout title="Archivo" nav="projects">
      <img src="/images/sections/community.jpg" alt="Remix" />
      <Separator className="bg-archives">Archivo - {group.name}</Separator>
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
          </div>
        </MediaObject>
      ))}
    </Layout>
  );
}
