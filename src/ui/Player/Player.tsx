import React from "react";
import { Audioset } from "../../audioset";
import { getAudioContext, player } from "../../player";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import "./Player.css";
import Preview from "./Preview";
import { useResourceLoadingStatus } from "./useResourceLoadingStatus";
import { Visuals } from "./Visuals";

const SKIP_PREVIEW = true;

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const resourceStatus = useResourceLoadingStatus();
  const isReady = SKIP_PREVIEW || resourceStatus.status === "ready";
  const { isDesktop } = useDeviceType();

  const isVisual = isDesktop || isReady;

  const handleStart = () => {
    getAudioContext()
      .then(() => player.resources.load())
      .then(() => (player.control.keyboard.active = true));
  };

  return (
    <div className="App Player">
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          {isReady ? (
            <Controller audioset={audioset} />
          ) : (
            <Preview
              audioset={audioset}
              resourceStatus={resourceStatus}
              onStart={handleStart}
            />
          )}
        </div>
      </Scroll>
      <div className="footer">Player</div>
      {isVisual && (
        <div className="visuals">{<Visuals audioset={audioset} />}</div>
      )}
    </div>
  );
};
