import React from "react";
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
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDesktop } = useDeviceType();
  useKeyboardListener(player.control?.keyboard);

  const areVisualsVisible = isDesktop || player.isReady;
  const isSidebarVisible = !isFullscreen;

  return (
    <div className="App Player">
      {isSidebarVisible && (
        <Sidebar
          audioset={audioset}
          onFullscreen={toggleFullscreen}
          onStopAll={() => player?.control?.stopAll(0)}
        >
          {player.isReady && player.control ? (
            <Controller
              audioset={audioset}
              state={player.state}
              control={player.control}
            />
          ) : (
            <Preview
              audioset={audioset}
              isReady={player.isReady}
              onStart={() => player.setReady(true)}
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
