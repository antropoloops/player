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
import { useQuery } from "react-query";
import API from "../../api";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "../Icons";
import { ReactComponent as PlayIcon } from "../../assets/play-circle.svg";

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
  const { data: parent } = useQuery(
    ["bundle", { path: project.meta.parent_path }],
    (_, params) => API.bundles.get(params),
    { enabled: project.meta.parent_path }
  );

  const currentPage: Page | undefined = isRoot
    ? page
    : { slug: "", title: project.meta.title, content: project.meta.readme };

  const references = project.audiosets || [];

  const backTo = (
    <Link
      className="p-2 flex items-center bg-gray-medium group"
      to={project.meta.parent_path || routes.sets()}
    >
      <ArrowLeft className="mr-1 h-5 w-5 text-gray-light group-hover:text-white-dark" />
      <div className="text-white group-hover:text-white-light">
        {parent?.meta.title || "Proyectos sonoros"}
      </div>
    </Link>
  );

  return (
    <Layout
      title={isRoot ? FMT(section?.id || "") : project.meta.title}
      backTo={
        project.meta.parent_path || (isRoot ? routes.root() : routes.sets())
      }
      desktop={<PageDesktop page={currentPage} />}
    >
      <div className="sidebar sm:pr-3">
        {!isRoot && !isMobile && backTo}
        <img
          className="w-full mb-2"
          alt={project.meta.title}
          src={isRoot ? section?.image_url : project.meta.logo_url}
        />
        {isMobile && (
          <Readme
            className="bg-gray-medium p-4 mb-2"
            content={isRoot ? page?.content || "" : project.meta.readme}
          />
        )}
        <ul className="Audiosets">
          {references.map((reference) => (
            <MediaObject
              className="bg-gray-medium mb-2 group"
              key={reference.id}
              to={`/set/${reference.publish_path}`}
              image={reference.logo_url}
              alt={reference.title}
            >
              <div className="w-full flex items-center group">
                <div className="h-full flex-grow flex flex-col px-2 group-hover:text-white-light">
                  <h3 className="font-medium my-2">{reference.title}</h3>
                  <div className="h-full flex flex-col justify-center">
                    <p className="text-sm lg:text-base font-light">
                      {reference.description}
                    </p>
                  </div>
                </div>
                {isRoot ? (
                  <ArrowRight className="text-gray-light flex-shrink-0 mr-2 my-2 group-hover:text-white-dark" />
                ) : (
                  <PlayIcon className="flex-shrink-0 text-white-dark w-8 h-8 mt-2 mr-2 group-hover:text-green" />
                )}
              </div>
            </MediaObject>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default BrowseProject;
