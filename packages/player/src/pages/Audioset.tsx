import React from "react";
import { isAudioset, Project as ProjectData } from "@atpls/audioset";
import { Player } from "../ui/components/Player";
import { Project } from "../ui/components/Project";
import useAnalytics from "../ui/hooks/useAnalytics";
import { useRemoteBundle } from "../ui/hooks/useRemoteBundle";
import { Loading } from "../ui/shared/Loading";
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
