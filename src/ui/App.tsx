import React from "react";
import { match as Match } from "react-router-dom";
import { Audioset, AudiosetProject } from "../audioset";
import "./App.css";
import AudiosetBrowser from "./Browser";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { Player } from "./Player";
import { useAudiosetLoadStatus } from "./useAudiosetLoad";

interface AppParams {
  id: string;
}

interface LoadAudiosetProps {
  match: Match<AppParams>;
}

const LoadAudioset = ({ match }: LoadAudiosetProps) => {
  const id = match.params.id || "index";
  const loadStatus = useAudiosetLoadStatus(id);

  switch (loadStatus.status) {
    case "loading":
      return <Loading />;
    case "ready":
      const audioset = loadStatus.audioset;
      return audioset.type === "project" ? (
        <AudiosetBrowser audioset={audioset as AudiosetProject} />
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

export default LoadAudioset;
