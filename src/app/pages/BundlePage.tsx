import React from "react";
import { useQuery } from "react-query";
import { isAudioset, isProject } from "../../audioset";
import useAnalytics from "../hooks/useAnalytics";
import LoadingPage from "./LoadingPage";
import ProjectBundle from "../components/bundle/ProjectBundle";
import API from "../api";
import SimplePlayerScreen from "../components/simple-player/SimplePlayerScreen";

type Props = {
  idOrUrl: string;
};

const SetConductorPage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { status, data: bundle } = useQuery(
    ["bundle", { path: idOrUrl }],
    (_, params) => API.bundles.get(params)
  );
  const { data: section } = useQuery(["section", "projecs"], () =>
    API.sections.get("projects")
  );

  const loading = status === "loading";

  return loading ? (
    <LoadingPage />
  ) : bundle && isProject(bundle) ? (
    <ProjectBundle section={section} project={bundle} />
  ) : bundle && isAudioset(bundle) ? (
    <SimplePlayerScreen audioset={bundle} />
  ) : null;
};

export default SetConductorPage;
