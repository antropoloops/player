import React from "react";
import { Audioset } from "../../Audioset";
import { player } from "../../Player";
import { getAudioContext } from "../../Player/AudioContext";
import { Header } from "../shared/Header";
import { Clips } from "./Clips";
import "./index.css";
import Preview from "./Preview";
import { useResourceLoadingStatus } from "./useResourceLoadingStatus";
import { Visuals } from "./Visuals";

const SKIP = false;

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const resourceStatus = useResourceLoadingStatus();
  const isReady = SKIP || resourceStatus.status === "ready";

  const handleStart = () => {
    getAudioContext()
      .then(() => player.resources.load())
      .then(() => (player.control.keyboard.active = true));
  };

  return (
    <div className="App Player">
      <Header meta={audioset.meta} />
      <div className="scroll">
        <div className="content">
          {isReady ? (
            <Clips audioset={audioset} />
          ) : (
            <Preview
              audioset={audioset}
              resourceStatus={resourceStatus}
              onStart={handleStart}
            />
          )}
        </div>
      </div>
      <div className="footer">Player</div>
      <div className="visuals">{<Visuals audioset={audioset} />}</div>
    </div>
  );
};
