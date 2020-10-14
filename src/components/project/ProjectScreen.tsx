import React from "react";
import { Project } from "../../audioset";
import { useDeviceType } from "../../hooks/useDeviceType";
import routes from "../../routes";
import Layout from "../layout/Layout";
import useLocale from "../../hooks/useLocale";
import usePage from "../../hooks/usePage";
import { Section } from "../../api/sections";
import { Page } from "../../api/pages";
import WhitePage from "../shared/PageDesktop";
import BackToLink from "../BackToLink";
import HtmlContent from "../HtmlContent";
import ProjectAudiosetItem from "./ProjectAudiosetItem";

type Props = {
  section?: Section;
  project: Project;
  readme?: boolean;
};
const ProjectScreen: React.FC<Props> = ({ section, project, readme }) => {
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

  const imageSrc = isRoot ? section?.image_url : project.meta.logo_url;

  return (
    <Layout
      title={isRoot ? FMT(section?.id || "") : project.meta.title}
      backTo={isRoot ? routes.root() : routes.projects()}
      desktop={<WhitePage page={currentPage} />}
    >
      {!isRoot && !isMobile && section?.id !== "community" && (
        <BackToLink
          to={project.meta.parent_path || routes.projects()}
          label="Projectos sonoros"
        />
      )}
      {imageSrc && (
        <img className="w-full" alt={project.meta.title} src={imageSrc} />
      )}
      <ul>
        {references.map((reference) => (
          <ProjectAudiosetItem
            key={reference.id}
            reference={reference}
            linkTo={
              isRoot
                ? routes.project(reference.publish_path)
                : readme
                ? routes.readme(reference.publish_path)
                : routes.audioset(reference.publish_path)
            }
            play={!isRoot}
          />
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

export default ProjectScreen;
