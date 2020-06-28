import React from "react";
import { isAudioset, isProject } from "../../../audioset";
import useAnalytics from "../../hooks/useAnalytics";
import LoadingPage from "../LoadingPage";
import AudiosetPage from "./AudiosetPage";
import BrowseProjectPage from "./BrowseProjectPage";
import { useQuery } from "react-query";
import API from "../../api";

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
    <BrowseProjectPage section={section} project={bundle} />
  ) : bundle && isAudioset(bundle) ? (
    <AudiosetPage section={section} audioset={bundle} />
  ) : null;
};

export default SetConductorPage;
