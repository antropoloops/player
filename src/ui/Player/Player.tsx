import React, { useState } from "react";
import { Audioset } from "../../audioset";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Preview } from "./Preview";
import { Sidebar } from "./Sidebar";
import { useFullscreen } from "./useFullscreen";
import { useKeyboardListener } from "./useKeyboardListener";
import { usePlayer } from "./usePlayer";

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const player = usePlayer(audioset);
  const [isReady, setReady] = useState<boolean>(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDesktop } = useDeviceType();
  useKeyboardListener();

  const isVisual = isDesktop || isReady;

  const isSidebarVisible = !isFullscreen;
  // useAutoStartAudio(isReady, audioset, handleStart);

  return (
    <div className="App Player">
      {isSidebarVisible && (
        <Sidebar audioset={audioset} onFullscreen={toggleFullscreen}>
          {isReady && player.control ? (
            <Controller
              audioset={audioset}
              state={player.state}
              control={player.control}
            />
          ) : (
            <Preview
              audioset={audioset}
              isReady={isReady}
              onStart={() => setReady(true)}
            />
          )}
        </Sidebar>
      )}
      {isVisual && (
        <div className="visuals">
          <div id="visuals" ref={player.visualsRef} />
        </div>
      )}
    </div>
  );
};
