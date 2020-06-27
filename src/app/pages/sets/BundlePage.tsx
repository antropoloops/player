import React from "react";
import { isAudioset, isProject } from "../../../audioset";
import useAnalytics from "../../hooks/useAnalytics";
import LoadingPage from "../LoadingPage";
import AudiosetPage from "./AudiosetPage";
import BrowsePage from "./BrowsePage";
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

  const loading = status === "loading";

  return loading ? (
    <LoadingPage />
  ) : bundle && isProject(bundle) ? (
    <BrowsePage project={bundle} />
  ) : bundle && isAudioset(bundle) ? (
    <AudiosetPage audioset={bundle} />
  ) : null;
};

export default SetConductorPage;
