import React, { useEffect, useReducer, useCallback } from "react";
import Visuals from "../shared/Visuals";
import useSync from "../../hooks/useSync";
import { initAudio } from "../../../lib/audio";
import { stopAll, togglePlay } from "../../../lib/sync";
import * as screen from "screenfull";
import "./Explorer.css";

const initialState = {
  sidebar: true,
  active: {}
};

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case "active":
      return { ...state, active: action.active };
    default:
      return state;
  }
}

const Explorer = ({ audioset }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const update = useCallback(
    state => {
      const active = state.clips.reduce((active, clip) => {
        active[clip.id] = true;
        return active;
      }, {});
      dispatch({ type: "active", active });
    },
    [dispatch]
  );
  const sync = useSync(audioset, update);
  sync.subscribe(state => {});
  useEffect(() => {
    sync.dispatch(stopAll());
  }, [sync]);

  useEffect(() => {
    initAudio().then(() => dispatch({ type: "audioReady" }));
  }, []);

  const handleClipClick = clip => sync.dispatch(togglePlay(clip.id));

  return (
    <div className="App Explorer">
      {state.sidebar && (
        <div className="sidebar">
          {audioset.tracks.map(track => (
            <Track
              key={track.id}
              track={track}
              onClickClip={handleClipClick}
              active={state.active}
            />
          ))}
        </div>
      )}
      <Visuals sync={sync} audioset={audioset} />
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

const Clip = ({ clip, onClick, active }) => (
  <div className={`Clip ${active ? "active" : ""}`}>
    <img src={clip.coverUrl} alt={clip.id} onClick={() => onClick(clip)} />
    <span className="keyMap">{clip.key}</span>
  </div>
);
