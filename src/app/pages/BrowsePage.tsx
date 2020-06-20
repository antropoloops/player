import React from "react";
import { Project } from "../../audioset";
import { useDeviceType } from "../hooks/useDeviceType";
import { Readme } from "../components/Player/Readme";
import { Link } from "react-router-dom";
import { Markdown } from "../components/Markdown";
import routes from "../routes";
import Layout from "../components/layout/Layout";
import { useQuery } from "react-query";
import API from "../api";
import useLocale from "../hooks/useLocale";

type Props = {
  project: Project;
};
const BrowsePage: React.FC<Props> = ({ project }) => {
  const { formatMessage: f } = useLocale();
  const { isMobile } = useDeviceType();
  const { data: section } = useQuery(["section", "projecs"], () =>
    API.sections.get("projects")
  );

  const references = project.audiosets || [];
  const isRoot = project.meta.path === "home";

  return (
    <Layout
      title={isRoot ? f(section?.id.toUpperCase() || "") : project.meta.title}
      backTo={
        project.meta.parent_path || (isRoot ? routes.root() : routes.sets())
      }
      desktop={
        <Markdown
          className="h-full bg-gray-medium text-white px-4 py-2"
          markdown={project.meta.readme}
        />
      }
    >
      <div className="h-full bg-gray-dark">
        <img
          className="w-full"
          alt={project.meta.title}
          src={isRoot ? section?.image_url : project.meta.logo_url}
        />
        {isMobile && (
          <Readme
            className="bg-gray-medium p-4"
            content={project.meta.readme}
          />
        )}
        <ul className="Audiosets">
          {references.map((reference) => (
            <Link
              className="mb-2 flex w-full text-white bg-gray-light"
              to={`/set/${reference.publish_path}`}
              key={reference.id}
            >
              <div className="w-1/3 flex-shrink-0">
                <img
                  className="w-full"
                  src={reference.logo_url}
                  alt={reference.title}
                />
              </div>
              <div className="p-2">
                <h3 className="font-normal mb-2">{reference.title}</h3>
                <p className="text-sm">{reference.description}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default BrowsePage;
