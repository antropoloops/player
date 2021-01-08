import React from "react";
import { useCurrentGroup } from "../../@backend/hooks/useCurrentGroup";
import { useObserveList } from "../../@backend/hooks/useObserveModel";
import NotAuthorizedPage from "../../@backend/pages/NotAuthorizedPage";
import { Project, ProjectType, ProjetAccess } from "../../models";
import MediaObject from "../../components/MediaObject";
import routes from "../../routes";
import Layout from "../../components/layout/Layout";
import { DesktopView, Separator, Title } from "../../@core/components";
import ActionButton from "../components/shared/ActionButton";
import { DataStore } from "aws-amplify";
import { useHistory } from "react-router-dom";

type Props = {
  className?: string;
};

export default function ArchiveListPage({ className }: Props) {
  const history = useHistory();
  const group = useCurrentGroup();
  const { data: archives } = useObserveList(Project, group?.id, (c) =>
    c.type("eq", ProjectType.ARCHIVE)
  );

  if (!group) return <NotAuthorizedPage />;

  const createArchive = async () => {
    const archive = await DataStore.save(
      new Project({
        type: ProjectType.ARCHIVE,
        groupID: group.id,
        access: ProjetAccess.GROUP,
        meta: {
          title: "Archivo " + (archives.length + 1),
        },
        remix: {},
      })
    );
    history.push(routes.archive(archive.id));
  };

  if (!group) return <NotAuthorizedPage />;

  return (
    <Layout
      title="Archivos"
      nav="admin"
      desktop={
        <DesktopView>
          <Title level={1}>Archivos</Title>
          <div className="flex my-4">
            <ActionButton className="bg-archives" onClick={createArchive}>
              Crear nuevo archivo
            </ActionButton>
          </div>
        </DesktopView>
      }
    >
      <img src="/images/sections/community.jpg" alt="Remix" />
      <Separator className="bg-archives">Archivos - {group.name}</Separator>
      {archives.map((archive) => (
        <MediaObject
          key={archive.id}
          className="bg-gray-light group max-w-full hover:bg-gray-lighter"
          to={routes.archive(archive.id)}
          image="/images/sections/community.jpg"
          alt={archive.meta.title || "Sin título"}
        >
          <div className="w-2/3 flex items-center p-2 group-hover:text-white-light">
            <span className="flex-grow text-lg truncate">
              {archive.meta.title || "Sin título"}
            </span>
          </div>
        </MediaObject>
      ))}
    </Layout>
  );
}
