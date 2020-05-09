import React from "react";
import { isAudioset, Project as ProjectData } from "../../audioset";
import { Player } from "../components/Player";
import { Project } from "../components/Project";
import useAnalytics from "../hooks/useAnalytics";
import { useRemoteBundle } from "../hooks/useRemoteBundle";
import { Loading } from "../shared/Loading";
import NotFound from "./NotFoundPage";

interface Props {
  idOrUrl: string;
}
const AudiosetPage = ({ idOrUrl }: Props) => {
  useAnalytics();
  const { bundle, loading } = useRemoteBundle(idOrUrl);
  if (loading) {
    return <Loading />;
  } else if (bundle) {
    return isAudioset(bundle) ? (
      <Player audioset={bundle} />
    ) : (
      <Project project={bundle as ProjectData} />
    );
  } else {
    return <NotFound />;
  }
};

export default AudiosetPage;
