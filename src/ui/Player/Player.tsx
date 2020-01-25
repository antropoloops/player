import React, { useEffect } from "react";
import Collapse from "react-css-collapse";
import { autoUnlockAudio } from "../../active-audio-context";
import { Audioset, BundleMetadata } from "../../audioset";
import { BundleHeader } from "../shared/Header";
import { ArrowDown } from "../shared/Icons";
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
    <button className="navigation btn-link" onClick={session.toggle}>
      <ArrowDown />
      {meta.title}
    </button>
  </div>
);
export const Player = ({ audioset }: PlayerProps) => {
  const session = useSession(audioset);
  const player = usePlayer(audioset, session.loader);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isMobile } = useDeviceType();
  useKeyboardListener(player.control?.keyboard);

  useEffect(() => {
    autoUnlockAudio();
  }, []);

  const isSidebarVisible = !isFullscreen;
  const areVisualsHidden = isMobile && session.visible;
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
          <Collapse isOpen={session.loading}>
            <Spinner center="horizontal" />
          </Collapse>
          <Collapse isOpen={session.visible}>
            <Session
              audioset={audioset}
              isStarted={session.started}
              onStart={() => session.start()}
            />
          </Collapse>
          <Collapse isOpen={showControl}>
            <Controller
              audioset={audioset}
              state={player.state}
              control={!session.visible ? player.control : undefined}
              onResume={session.start}
            />
          </Collapse>
        </Sidebar>
      )}
      <div className="visuals">
        <div
          className={areVisualsHidden ? "hidden" : "visible"}
          id="visuals"
          ref={player.visualsRef}
        />
      </div>
    </div>
  );
};
