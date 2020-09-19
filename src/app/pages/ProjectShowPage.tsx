import React from "react";
import { useQuery } from "react-query";
import { isAudioset, isProject } from "../../audioset";
import useAnalytics from "../hooks/useAnalytics";
import LoadingScreen from "../components/LoadingScreen";
import ProjectScreen from "../components/project/ProjectScreen";
import API from "../api";
import { Redirect } from "react-router-dom";
import routes from "../routes";

type Props = {
  idOrUrl: string;
};

const ProjectShowPage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { status, data: bundle } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params)
  );
  const { data: section } = useQuery(["section", "projecs"], () =>
    API.sections.get("projects")
  );

  if (status === "loading" || !bundle) return <LoadingScreen />;
  if (isAudioset(bundle)) return <Redirect to={routes.audioset(bundle.id)} />;

  return isProject(bundle) ? (
    <ProjectScreen section={section} project={bundle} />
  ) : null;
};

export default ProjectShowPage;
