import React, { useEffect } from "react";
import { Audioset } from "../../audioset";
import { getActiveAudioContext, player } from "../../player";
import { Header } from "../shared/Header";
import { Scroll } from "../shared/Scroll";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Footer } from "./Footer";
import Preview from "./Preview";
import { useFullscreen } from "./useFullscreen";
import { useKeyboardListener } from "./useKeyboardListener";
import { useResourceLoader } from "./useResourceLoader";
import { Visuals } from "./Visuals";

export interface PlayerProps {
  audioset: Audioset;
}

const startPlayer = () =>
  getActiveAudioContext().then(() => {
    player.resources.load();
    player.control.keyboard.setActive(true);
  });

export const Player = ({ audioset }: PlayerProps) => {
  const { status } = useResourceLoader();
  const fullscreen = useFullscreen();
  const isReady = status.stage !== "pending" && status.stage !== "error";
  const { isDesktop } = useDeviceType();
  useKeyboardListener();

  const isVisual = isDesktop || isReady;

  const toggleFullscreenAndStart = () => {
    fullscreen.toggle();
    if (!isReady) {
      startPlayer();
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
              onStart={startPlayer}
            />
          )}
        </div>
      </Scroll>
      <Footer onFullscreen={toggleFullscreenAndStart} />
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
