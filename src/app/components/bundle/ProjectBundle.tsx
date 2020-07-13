import React from "react";
import { Project } from "../../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import { Readme } from "../Player/Readme";
import { Markdown } from "../Markdown";
import routes from "../../routes";
import Layout from "../layout/Layout";
import useLocale from "../../hooks/useLocale";
import MediaObject from "../MediaObject";
import usePage from "../../hooks/usePage";
import Page from "../pages/PageDesktop";
import Breadcrums from "../Breadcrumbs";
import { Section } from "../../api/sections";

type Props = {
  section?: Section;
  project: Project;
};
const BrowseProject: React.FC<Props> = ({ section, project }) => {
  const { formatMessage: FMT } = useLocale();
  const { isMobile } = useDeviceType();
  // index is the old name
  const isRoot = project.meta.path === "home" || project.meta.path === "index";
  const { data: page } = usePage("proyectos", { refetchOnMount: isRoot });

  const references = project.audiosets || [];

  return (
    <Layout
      className="BrowserPage"
      title={isRoot ? FMT(section?.id || "") : project.meta.title}
      backTo={
        project.meta.parent_path || (isRoot ? routes.root() : routes.sets())
      }
      desktop={
        isRoot ? (
          <Page page={page} />
        ) : (
          <div className="h-full bg-gray-medium text-white px-4 py-2">
            {section && (
              <Breadcrums
                items={[
                  { label: FMT(section.id), to: section.to },
                  {
                    label: project.meta.parent_path,
                    to: project.meta.parent_path,
                  },
                ]}
              />
            )}
            <h1 className="text-4xl mb-4">{project.meta.title}</h1>
            <Markdown className="" markdown={project.meta.readme} />
          </div>
        )
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
            <MediaObject
              key={reference.id}
              to={`/set/${reference.publish_path}`}
              image={reference.logo_url}
              alt={reference.title}
            >
              <div className="p-2">
                <h3 className="font-normal mb-2">{reference.title}</h3>
                <p className="text-sm">{reference.description}</p>
              </div>
            </MediaObject>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default BrowseProject;
