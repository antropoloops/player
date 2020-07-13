import React from "react";
import { Project } from "../../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import { Readme } from "../Player/Readme";
import routes from "../../routes";
import Layout from "../layout/Layout";
import useLocale from "../../hooks/useLocale";
import MediaObject from "../MediaObject";
import usePage from "../../hooks/usePage";
import { Section } from "../../api/sections";
import { Page } from "../../api/pages";
import PageDesktop from "../pages/PageDesktop";

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
  // const { data: parent } = useQuery(
  //   ["bundle", { path: project.meta.parent_path }],
  //   (_, params) => API.bundles.get(params),
  //   { enabled: project.meta.parent_path }
  // );

  const currentPage: Page | undefined = isRoot
    ? page
    : { slug: "", title: project.meta.title, content: project.meta.readme };

  const references = project.audiosets || [];

  return (
    <Layout
      title={isRoot ? FMT(section?.id || "") : project.meta.title}
      backTo={
        project.meta.parent_path || (isRoot ? routes.root() : routes.sets())
      }
      desktop={
        <PageDesktop
          page={currentPage}
          // breadcrumbs={[{ label: parent?.meta.title, to: parent?.meta.path }]}
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
            content={isRoot ? page?.content || "" : project.meta.readme}
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
                <h3 className="font-medium mb-2">{reference.title}</h3>
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
