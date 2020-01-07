import React, { useEffect } from "react";
import { Audioset } from "../../audioset";
import { getAudioContext, player } from "../../player";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Footer } from "./Footer";
import Preview from "./Preview";
import { useFullscreen } from "./useFullscreen";
import { useResourceLoader } from "./useResourceLoader";
import { Visuals } from "./Visuals";

export interface PlayerProps {
  audioset: Audioset;
}
const handleStart = () =>
  getAudioContext()
    .then(() => player.resources.load())
    .then(() => player.control.keyboard.setActive(true));

export const Player = ({ audioset }: PlayerProps) => {
  const { status } = useResourceLoader();
  const fullscreen = useFullscreen();
  const isReady = status.stage === "ready";
  const { isDesktop } = useDeviceType();

  const isVisual = isDesktop || isReady;

  const handleFullScreen = () => {
    fullscreen.toggle();
    if (!isReady) {
      handleStart();
    }
  };

  const Sidebar = () => (
    <>
      <Header meta={audioset.meta} />
      <Scroll>
        <div className="content">
          {isReady ? (
            <Controller audioset={audioset} />
          ) : (
            <Preview
              audioset={audioset}
              resourceStatus={status}
              onStart={handleStart}
            />
          )}
        </div>
      </Scroll>
      <Footer onFullscreen={handleFullScreen} />
    </>
  );

  const isSidebarVisible = !fullscreen.isFull;
  // useAutoStartAudio(isReady, audioset, handleStart);

  return (
    <div className="App Player">
      {isSidebarVisible && <Sidebar />}
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
