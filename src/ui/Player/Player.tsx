import React, { useEffect } from "react";
import { Audioset } from "../../audioset";
import { getAudioContext, player } from "../../player";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Footer } from "./Footer";
import Preview from "./Preview";
import { useResourceLoadingStatus } from "./useResourceLoadingStatus";
import { Visuals } from "./Visuals";

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const resourceStatus = useResourceLoadingStatus();
  const isReady = resourceStatus.status === "ready";
  const { isDesktop } = useDeviceType();

  const isVisual = isDesktop || isReady;

  const handleStart = () =>
    getAudioContext()
      .then(() => player.resources.load())
      .then(() => player.control.keyboard.setActive(true));

  // useAutoStartAudio(isReady, audioset, handleStart);

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
      {isReady && <Footer />}
      {isVisual && (
        <div className="visuals">{<Visuals audioset={audioset} />}</div>
      )}
    </div>
  );
};

/**
 * Start audio when clicking in window
 */
export function useAutoStartAudio(
  isReady: boolean,
  audioset: Audioset,
  startAudio: () => void,
) {
  useEffect(() => {
    if (!isReady && audioset.id) {
      const onClick = () => {
        startAudio();
        removeListener();
      };
      const removeListener = () => {
        window.removeEventListener("click", onClick);
      };
      window.addEventListener("click", onClick);
      return removeListener;
    }
  }, [audioset.id, isReady, startAudio]);

  return startAudio;
}
