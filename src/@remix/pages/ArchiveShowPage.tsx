import React from "react";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import {
  useObserveList,
  useObserveModel,
} from "../../@backend/hooks/useObserveModel";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import { Media, Project } from "../../models";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import Layout from "../../components/layout/Layout";
import { Separator } from "../../@core/components";
import { useParams } from "react-router-dom";
import ShowEditArchive from "../components/archive/ShowEditArchive";

export default function ArchiveShowPage() {
  const params = useParams<{ id: string; type?: string; childId?: string }>();
  const group = useCurrentGroup();

  const { data: archive } = useObserveModel(Project, params.id);
  const { data: recordings } = useObserveList(Media, (c) =>
    c.projectID("eq", params.id)
  );

  if (!group) return <NotAuthorizedPage />;
  else if (!archive) return null;

  const main = <ShowEditArchive group={group} archive={archive} />;

  return (
    <Layout title="Archivo" nav="projects" desktop={main}>
      <img src="/images/sections/community.jpg" alt="Remix" />
      <Separator className="bg-archives">Archivo - {group.name}</Separator>
      {recordings.map((recording) => (
        <MediaObject
          key={recording.id}
          className="bg-gray-light group max-w-full hover:bg-gray-lighter"
          to={routes.archiveRecording(params.id, recording.id)}
          image="/images/sections/community.jpg"
          alt={recording.meta.title || ""}
        >
          <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
            <span className="flex-grow text-lg truncate">
              {recording.meta.title || "Sin título"}
            </span>
          </div>
        </MediaObject>
      ))}
    </Layout>
  );
}
