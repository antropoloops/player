import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import API from "../../api";
import { useDeviceType } from "../../hooks/useDeviceType";
import LoadingScreen from "../../components/LoadingScreen";
import { Readme } from "../../components/shared/Readme";
import routes from "../../routes";
import MediaObject from "../../components/MediaObject";

type Props = {};

type RouteParams = {
  id: string;
};

const ProjectPage: React.FC<Props> = () => {
  const { params } = useRouteMatch<RouteParams>();
  const { isMobile } = useDeviceType();
  const { data: project } = useQuery(["project", { path: params.id }], (_, p) =>
    API.projects.get(p)
  );

  if (!project) return <LoadingScreen />;

  return (
    <Layout
      title={params.id ? project.meta.title : "Proyectos"}
      backTo={
        project.meta.parent_path
          ? routes.project(project.meta.parent_path)
          : routes.root()
      }
    >
      <div className="h-full bg-gray-dark">
        {
          <img
            className="w-full"
            alt={project.meta.title}
            src={project.meta.logo_url}
          />
        }
        {isMobile && (
          <Readme
            className="bg-gray-medium p-4"
            content={project.meta.readme}
          />
        )}
        {project.audiosets.map((audioset) => (
          <MediaObject
            key={audioset.id}
            to={
              audioset.type === "audioset"
                ? routes.audioset(audioset.publish_path)
                : routes.project(audioset.publish_path)
            }
            image={audioset.logo_url}
            alt={audioset.title}
          >
            <h3 className="font-normal mb-2">{audioset.title}</h3>
            <p className="text-sm">{audioset.description}</p>
          </MediaObject>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectPage;
