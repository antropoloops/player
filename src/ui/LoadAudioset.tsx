import React from "react";
import { isAudioset, Project } from "../audioset";
import "./App.css";
import { Browser } from "./Browser";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { Player } from "./Player";
import { useBundleLoadStatus } from "./useBundleLoadStatus";

interface LoadAudiosetProps {
  idOrUrl: string;
}

export const LoadAudioset = ({ idOrUrl }: LoadAudiosetProps) => {
  const loadStatus = useBundleLoadStatus(idOrUrl);

  switch (loadStatus.stage) {
    case "loading":
      return <Loading />;
    case "ready":
      const bundle = loadStatus.payload;
      return isAudioset(bundle) ? (
        <Player audioset={bundle} />
      ) : (
        <Browser audioset={bundle as Project} />
      );
    case "error":
      return <NotFound />;
    default:
      return (
        <pre style={{ color: "white" }}>
          {JSON.stringify(loadStatus, null, 2)}
        </pre>
      );
  }
};
