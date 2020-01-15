import React from "react";
import { isAudioset, Project } from "../../audioset";
import { Browser } from "../Browser";
import { Player } from "../Player";
import { useBundleLoadStatus } from "../useBundleLoadStatus";
import "./App.css";
import Loading from "./Loading";
import NotFound from "./NotFound";

interface BundleProps {
  idOrUrl: string;
}

export const Bundle = ({ idOrUrl }: BundleProps) => {
  const loadStatus = useBundleLoadStatus(idOrUrl);

  switch (loadStatus.stage) {
    case "loading":
      return <Loading />;
    case "ready":
      const bundle = loadStatus.payload;
      return isAudioset(bundle) ? (
        <Player audioset={bundle} />
      ) : (
        <Browser project={bundle as Project} />
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
