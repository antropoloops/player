import React from "react";
import { isAudioset, isProject } from "../../../audioset";
import useAnalytics from "../../hooks/useAnalytics";
import { useRemoteBundle } from "../../hooks/useRemoteBundle";
import LoadingPage from "../LoadingPage";
import AudiosetPage from "../AudiosetPage";
import BrowsePage from "./BrowsePage";

type Props = {
  idOrUrl: string;
};

const SetConductorPage: React.FC<Props> = ({ idOrUrl }) => {
  useAnalytics();
  const { bundle, loading } = useRemoteBundle(idOrUrl);

  return loading ? (
    <LoadingPage />
  ) : bundle && isProject(bundle) ? (
    <BrowsePage project={bundle} />
  ) : bundle && isAudioset(bundle) ? (
    <AudiosetPage audioset={bundle} />
  ) : null;
};

export default SetConductorPage;
