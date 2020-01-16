import React, { useEffect, useState } from "react";
import { Audioset } from "../../audioset";
import { getActiveAudioContext } from "../../player";
import {
  AudiosetControl,
  EmptyControlState,
  PlayerControl,
} from "../../player/Control";
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
        <div className="visuals">{<Visuals audioset={audioset} />}</div>
      )}
    </div>
  );
};

function usePlayer(audioset: Audioset) {
  const [control, setControl] = useState<PlayerControl | null>(null);
  const [state, setState] = useState(EmptyControlState);

  useEffect(() => {
    getActiveAudioContext().then(ctx => {
      const ctl = new AudiosetControl(audioset, {
        onControlStateChanged: newState => {
          setState(newState);
        },
        onControlCommand: command => {
          // console.log("command!", command);
        },
      });
      setControl(ctl);
      setState(ctl.getState());
    });
  }, [audioset]);

  return { control, state };
}
