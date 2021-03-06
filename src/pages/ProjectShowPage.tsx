import React from "react";
import { useQuery } from "react-query";
import { isAudioset, isProject } from "../audioset";
import useAnalytics from "../hooks/useAnalytics";
import LoadingScreen from "../components/LoadingScreen";
import ProjectScreen from "../components/project/ProjectScreen";
import API from "../api";
import { Redirect } from "react-router-dom";
import routes from "../routes";
import { communityProject } from "../audioset/helpers";

type Props = {
  idOrUrl: string;
  sectionName?: string;
  readme?: boolean;
};

const ProjectShowPage: React.FC<Props> = ({
  idOrUrl,
  readme,
  sectionName = "projects",
}) => {
  useAnalytics();
  const { status, data: bundle } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params)
  );
  const { data: section } = useQuery(["section", sectionName], () =>
    API.sections.get(sectionName)
  );

  if (status === "loading" || !bundle) return <LoadingScreen />;
  if (isAudioset(bundle)) return <Redirect to={routes.audioset(bundle.id)} />;
  if (!isProject(bundle)) return null;

  const project = readme ? communityProject(bundle) : bundle;

  return isProject(bundle) ? (
    <ProjectScreen section={section} project={project} readme={readme} />
  ) : null;
};

export default ProjectShowPage;
