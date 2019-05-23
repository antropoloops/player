import React, { useState, useCallback } from "react";

import Visuals from "../Visuals/index.jsx";
import useSync from "../../hooks/useSync";
import { togglePlay, stopAll } from "../../../lib/sync";
import "./Explorer.css";
import Layout from "../shared/Layout";
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
  const toggleVisible = () => null;

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
        onClick={toggleVisible}
        visible={visible}
        actions={actions}
        header={() => <Header audioset={audioset} />}
      >
        {audioset.tracks.map(track => (
          <Track
            key={track.id}
            track={track}
            onClickClip={handleClipClick}
            active={active}
          />
        ))}
      </Layout.Sidebar>
      <Layout.Main className="main">
        <Visuals sync={sync} audioset={audioset} />
      </Layout.Main>
    </Layout>
  );
};

export default Explorer;

const Header = ({ audioset }) => (
  <a className="title" href="/">
    <h2>← {audioset.meta.title}</h2>
  </a>
);

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
