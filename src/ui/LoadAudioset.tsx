import React from "react";
import { Audioset, AudiosetProject } from "../audioset";
import "./App.css";
import { Browser } from "./Browser";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { Player } from "./Player";
import { useAudiosetLoadStatus } from "./useAudiosetLoad";

interface LoadAudiosetProps {
  idOrUrl: string;
}

export const LoadAudioset = ({ idOrUrl }: LoadAudiosetProps) => {
  const loadStatus = useAudiosetLoadStatus(idOrUrl);

  switch (loadStatus.stage) {
    case "loading":
      return <Loading />;
    case "ready":
      const audioset = loadStatus.audioset;
      return audioset.type === "project" ? (
        <Browser audioset={audioset as AudiosetProject} />
      ) : (
        <Player audioset={audioset as Audioset} />
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
