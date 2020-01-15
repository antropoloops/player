import React, { useEffect, useState } from "react";
import { Audioset } from "../../audioset";
import { getActiveAudioContext } from "../../player";
import { AudiosetControl, EmptyControlState } from "../../player/Control";
import { useDeviceType } from "../useDeviceType";
import { Controller } from "./Controller";
import { Preview } from "./Preview";
import { Sidebar } from "./Sidebar";
import { useFullscreen } from "./useFullscreen";
import { useKeyboardListener } from "./useKeyboardListener";
import { Visuals } from "./Visuals";

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const { playerState } = usePlayer(audioset);
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
          {isReady ? (
            <Controller audioset={audioset} state={playerState} />
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
        <div className="visuals">{<Visuals audioset={audioset} />}</div>
      )}
    </div>
  );
};

function usePlayer(audioset: Audioset) {
  const [player, setPlayer] = useState<any>(null);
  const [playerState, setPlayerState] = useState(EmptyControlState);

  useEffect(() => {
    getActiveAudioContext().then(ctx => {
      const control = new AudiosetControl(audioset, {
        onControlStateChanged: state => {
          setPlayerState(state);
        },
        onControlCommand: command => {
          // console.log("command!", command);
        },
      });
      setPlayer(control);
      setPlayerState(control.getState());
    });
  }, [audioset]);

  return { player, playerState };
}
