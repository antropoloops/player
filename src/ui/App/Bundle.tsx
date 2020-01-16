import React from "react";
import { isAudioset, Project } from "../../audioset";
import { Player } from "../Player";
import { Project as ProjectView } from "../Project";
import Loading from "../shared/Loading";
import "./App.css";
import NotFound from "./NotFound";
import { useRemoteBundle } from "./useRemoteBundle";

interface BundleProps {
  idOrUrl: string;
}
export const Bundle = ({ idOrUrl }: BundleProps) => {
  const { bundle, loading } = useRemoteBundle(idOrUrl);
  if (loading) {
    return <Loading />;
  } else if (bundle) {
    return isAudioset(bundle) ? (
      <Player audioset={bundle} />
    ) : (
      <ProjectView project={bundle as Project} />
    );
  } else {
    return <NotFound />;
  }
};
