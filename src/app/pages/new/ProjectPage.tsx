import React from "react";
import Layout from "../../components/layout/Layout";
import { useRouteMatch, Link } from "react-router-dom";
import { useQuery } from "react-query";
import API from "../../api";
import { useDeviceType } from "../../hooks/useDeviceType";
import LoadingPage from "../LoadingPage";
import { Readme } from "../../components/Player/Readme";
import routes from "../../routes";

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

  if (!project) return <LoadingPage />;

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
          <Link
            to={
              audioset.type === "audioset"
                ? routes.audioset(audioset.publish_path)
                : routes.project(audioset.publish_path)
            }
            className="mb-2 flex w-full text-white bg-gray-light"
            key={audioset.id}
          >
            <div className="ratio w-1/3 flex-shrink-0">
              <svg viewBox="0 0 16 9" />
              <img className="" src={audioset.logo_url} alt={audioset.title} />
            </div>
            <div className="p-2">
              <h3 className="font-normal mb-2">{audioset.title}</h3>
              <p className="text-sm">{audioset.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectPage;
