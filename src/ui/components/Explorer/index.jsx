import React, { useState, useCallback } from "react";

import Visuals from "../Visuals/index.jsx";
import useSync from "../../hooks/useSync";
import { togglePlay, stopAll } from "../../../lib/sync";
import "./Explorer.css";
import Layout from "../shared/Layout";
import useFullscreen from "../../hooks/useFullscreen";
import { useAudioContext } from "../../hooks/useAudioContext";
import Clip from "./Clip";

const isReady = process.env.NODE_ENV === "development" && true;

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
  const [ready, setReady] = useState(isReady);

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
    <Layout className="Explorer">
      <Layout.Sidebar
        visible={visible}
        actions={actions}
        onClick={() => setReady(false)}
      >
        {ready ? (
          <Tracks
            audioset={audioset}
            activeClips={active}
            onClickClip={handleClipClick}
            keyboard={sync.keyboard}
          />
        ) : (
          <Audioset audioset={audioset} onClick={() => setReady(true)} />
        )}
      </Layout.Sidebar>
      <Layout.Main className="main">
        <Visuals sync={sync} audioset={audioset} />
      </Layout.Main>
    </Layout>
  );
};

export default Explorer;

const Audioset = ({ audioset, onClick }) => (
  <div className="Audioset">
    <a className="back" href="/">
      &larr; back
    </a>
    <h1>{audioset.meta.title}</h1>
    <img src={audioset.meta.logo_url} alt={audioset.meta.title} />
    <p>{audioset.meta.description}</p>
    <div className="start">
      <button onClick={onClick}>Start!</button>
    </div>
  </div>
);

const Tracks = ({ audioset, onClickClip, activeClips, keyboard }) => (
  <div className="Tracks">
    {audioset.tracks.map(track => (
      <Track
        key={track.id}
        track={track}
        onClickClip={onClickClip}
        keyboard={keyboard}
        active={activeClips}
      />
    ))}
  </div>
);

const Track = ({ track, onClickClip, active, keyboard }) => {
  const style = {
    backgroundColor: track.color
  };
  return (
    <div className="Track" style={style}>
      <div className="name">{track.name}</div>
      {track.clipList.map(clip => (
        <Clip
          key={clip.id}
          active={active[clip.id] || false}
          clip={clip}
          onClick={onClickClip}
          keyboard={keyboard}
        />
      ))}
    </div>
  );
};
