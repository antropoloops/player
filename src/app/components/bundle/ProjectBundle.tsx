import React from "react";
import { Project } from "../../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import routes from "../../routes";
import Layout from "../layout/Layout";
import useLocale from "../../hooks/useLocale";
import MediaObject from "../MediaObject";
import usePage from "../../hooks/usePage";
import { Section } from "../../api/sections";
import { Page } from "../../api/pages";
import PageDesktop from "../pages/PageDesktop";
import { ReactComponent as PlayIcon } from "../../assets/play-circle.svg";
import BackToLink from "../BackToLink";
import HtmlContent from "../HtmlContent";
import { ArrowRight } from "../Icons";

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

  const currentPage: Page | undefined = isRoot
    ? page
    : { slug: "", title: project.meta.title, content: project.meta.readme };

  const references = project.audiosets || [];
  const setContent = isRoot ? page?.content || "" : project.meta.readme;

  return (
    <Layout
      title={isRoot ? FMT(section?.id || "") : project.meta.title}
      backTo={isRoot ? routes.root() : routes.sets()}
      desktop={<PageDesktop page={currentPage} />}
    >
      {!isRoot && !isMobile && (
        <BackToLink
          to={project.meta.parent_path || routes.sets()}
          label="Projectos sonoros"
        />
      )}
      <img
        className="w-full"
        alt={project.meta.title}
        src={isRoot ? section?.image_url : project.meta.logo_url}
      />
      <ul className="Audiosets">
        {references.map((reference) => (
          <MediaObject
            className="bg-gray-light group hover:bg-gray-lighter"
            key={reference.id}
            to={`/set/${reference.publish_path}`}
            image={reference.logo_url}
            alt={reference.title}
          >
            <div className="w-full flex items-center group">
              <div className="h-full flex-grow flex flex-col px-2 group-hover:text-white-light">
                <h3 className="leading-5 font-medium my-2">
                  {reference.title}
                </h3>
                <div className="h-full flex flex-col justify-center">
                  <p className="sm:hidden lg:block text-sm leading-4 font-light">
                    {reference.description}
                  </p>
                </div>
              </div>
              {isRoot ? (
                <ArrowRight className="text-white-dark flex-shrink-0 mr-2 my-2 group-hover:text-white" />
              ) : (
                <PlayIcon className="flex-shrink-0 text-white-dark w-8 h-8 mt-2 mr-2 group-hover:text-green" />
              )}
            </div>
          </MediaObject>
        ))}
      </ul>
      {isMobile && setContent && (
        <HtmlContent
          className="prose text-white bg-gray-medium p-4 mb-2"
          content={setContent}
        />
      )}
    </Layout>
  );
};

export default BrowseProject;
