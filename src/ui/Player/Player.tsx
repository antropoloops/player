import React, { useEffect } from "react";
import { Audioset, BundleMetadata } from "../../audioset";
import { autoUnlockAudio } from "../../player/AudioContext";
import { BundleHeader } from "../shared/Header";
import { Info } from "../shared/Icons";
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

interface SessionHeaderProps {
  meta: BundleMetadata;
  session: any;
}
const SessionHeader = ({ meta, session }: SessionHeaderProps) => (
  <div className="Header">
    <div className="navigation">
      <Info />
      <button className="btn-link" onClick={session.toggle}>
        {meta.title}
      </button>
    </div>
  </div>
);
export const Player = ({ audioset }: PlayerProps) => {
  const session = useSession(audioset);
  const player = usePlayer(audioset, session.loader);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDesktop } = useDeviceType();
  useKeyboardListener(player.control?.keyboard);

  useEffect(() => {
    autoUnlockAudio();
  }, []);

  const areVisualsVisible = isDesktop || session.started;
  const isSidebarVisible = !isFullscreen;

  const showControl = true;

  const Header = () =>
    session.started && !session.visible ? (
      <SessionHeader meta={audioset.meta} session={session} />
    ) : (
      <BundleHeader meta={audioset.meta} />
    );

  return (
    <div className="App Player">
      {isSidebarVisible && (
        <Sidebar
          header={Header}
          audioset={audioset}
          onFullscreen={toggleFullscreen}
          onStopAll={() => player?.control?.stopAll(0)}
        >
          {session.loading && <Spinner center="horizontal" />}
          {session.visible && (
            <Session
              audioset={audioset}
              isStarted={session.started}
              onStart={() => session.start()}
            />
          )}
          {showControl && (
            <Controller
              audioset={audioset}
              state={player.state}
              control={!session.visible ? player.control : undefined}
              onResume={session.start}
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
