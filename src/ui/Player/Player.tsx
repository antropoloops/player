import React, { useEffect } from "react";
import { Audioset } from "../../audioset";
import { autoUnlockAudio } from "../../player/AudioContext";
import { Spinner } from "../shared/Spinner";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Session } from "./Session";
import { Sidebar } from "./Sidebar";
import { useFullscreen } from "./useFullscreen";
import { useKeyboardListener } from "./useKeyboardListener";
import { usePlayer } from "./usePlayer";

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const player = usePlayer(audioset);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDesktop } = useDeviceType();
  useKeyboardListener(player.control?.keyboard);

  useEffect(() => {
    autoUnlockAudio();
  }, []);

  const areVisualsVisible = isDesktop || player.isStarted;
  const isSidebarVisible = !isFullscreen;

  const showSpinner = player.isStarted && !player.clipsReady;
  const showSession = !player.isStarted;

  return (
    <div className="App Player">
      {isSidebarVisible && (
        <Sidebar
          audioset={audioset}
          onFullscreen={toggleFullscreen}
          onStopAll={() => player?.control?.stopAll(0)}
        >
          {showSpinner && (
            <div className="spin">
              <Spinner />
            </div>
          )}
          {showSession && (
            <Session
              audioset={audioset}
              isStarted={player.isStarted}
              onStart={() => player.setStarted(true)}
            />
          )}
          {player.control && (
            <Controller
              audioset={audioset}
              state={player.state}
              control={player.control}
            />
          )}
        </Sidebar>
      )}
      {areVisualsVisible && (
        <div className="visuals">
          <div id="visuals" ref={player.visualsRef} />
        </div>
      )}
    </div>
  );
};
