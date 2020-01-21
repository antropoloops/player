import React from "react";
import { isAudioset, Project as ProjectData } from "../../audioset";
import { Player } from "../Player";
import { Project } from "../Project";
import { Loading } from "../shared/Loading";
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
      <Project project={bundle as ProjectData} />
    );
  } else {
    return <NotFound />;
  }
};
