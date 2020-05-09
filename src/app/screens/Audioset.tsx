import React from "react";
import { isAudioset, Project as ProjectData } from "../../audioset";
import { Player } from "../components/Player";
import { Project } from "../components/Project";
import useAnalytics from "../hooks/useAnalytics";
import { useRemoteBundle } from "../hooks/useRemoteBundle";
import { Loading } from "../shared/Loading";
import NotFound from "./NotFound";

interface Props {
  idOrUrl: string;
}
export const Audioset = ({ idOrUrl }: Props) => {
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
