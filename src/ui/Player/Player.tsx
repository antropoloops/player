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
import { useSession } from "./useSession";

export interface PlayerProps {
  audioset: Audioset;
}

export const Player = ({ audioset }: PlayerProps) => {
  const session = useSession(audioset);
  const player = usePlayer(audioset, session.loader);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDesktop } = useDeviceType();
  useKeyboardListener(player.control?.keyboard);

  useEffect(() => {
    autoUnlockAudio();
  }, []);

  const areVisualsVisible = isDesktop || session.isStarted;
  const isSidebarVisible = !isFullscreen;

  const showSpinner = session.isStarted && !session.isLoaded;
  const showSession = !session.isStarted;
  const showControl = true;

  const Header = () => <div className="Header">Hola!</div>;

  return (
    <div className="App Player">
      {isSidebarVisible && (
        <Sidebar
          header={Header}
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
              isStarted={session.isStarted}
              onStart={() => session.start()}
            />
          )}
          {showControl && (
            <Controller
              audioset={audioset}
              state={player.state}
              control={session.isStarted ? player.control : undefined}
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
