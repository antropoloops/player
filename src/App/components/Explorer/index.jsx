import React, { useState, useCallback } from "react";

import Visuals from "../shared/Visuals";
import useSync from "../../hooks/useSync";
import { togglePlay, stopAll } from "../../../lib/sync";
import "./Explorer.css";
import Sidebar from "../shared/Sidebar";
import useFullscreen from "../../hooks/useFullscreen";
import { useAudioContext } from "../../hooks/useAudioContext";
import Clip from "./Clip";

const Explorer = ({ audioset }) => {
  const [active, setActive] = useState([]);
  const onSyncStateChange = useCallback(state => {
    const active = state.clips.reduce((active, clip) => {
      active[clip.id] = true;
      return active;
    }, {});
    setActive(active);
  }, []);
  const sync = useSync(audioset, onSyncStateChange);

  const ctx = useAudioContext();

  const [visible, setVisible] = useState(true);
  const toggleVisible = () => setVisible(!visible);

  const fullscreen = useFullscreen(isFullscreen => setVisible(!isFullscreen));
  const openFullscreen = () => {
    fullscreen.open();
    sync.dispatch(stopAll());
  };

  const handleClipClick = clip =>
    sync.dispatch(togglePlay(clip.id, ctx.currentTime));

  const actions = () => (
    <>
      <button onClick={openFullscreen}>full screen</button>
      <button onClick={() => sync.dispatch(stopAll())}>stop all</button>
    </>
  );

  return (
    <div className="App Explorer">
      <Sidebar onClick={toggleVisible} visible={visible} actions={actions}>
        <a className="title" href="/">
          <h1>← {audioset.meta.title}</h1>
        </a>
        {audioset.tracks.map(track => (
          <Track
            key={track.id}
            track={track}
            onClickClip={handleClipClick}
            active={active}
          />
        ))}
      </Sidebar>
      <div className="main">
        <Visuals sync={sync} audioset={audioset} />
      </div>
    </div>
  );
};

export default Explorer;

const Track = ({ track, onClickClip, active }) => {
  const style = {
    backgroundColor: track.color
  };
  return (
    <div className="Track" style={style}>
      {track.clipList.map(clip => (
        <Clip
          key={clip.id}
          active={active[clip.id] || false}
          clip={clip}
          onClick={onClickClip}
        />
      ))}
    </div>
  );
};
