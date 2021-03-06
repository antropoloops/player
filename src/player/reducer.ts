import { PlayerAction } from "./actions";
import polyphonic from "./polyphonic";
import monophonic from "./monophonic";
import { PlayerEvent } from "./events";
import { PlayerState, createInitialState } from "./state";

export function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "init":
      return createInitialState(action.audioset);
    case "tick":
      if (state.queued.length === 0) return state;
      const isPoly = state.audioset.audio.mode === "1"; // FIXME: change to a name
      return isPoly ? polyphonic(state, action) : monophonic(state, action);
    case "event":
      return enqueue(state, action.event);
  }
}

const enqueue = (state: PlayerState, event: PlayerEvent): PlayerState => {
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };

  const track = tracks[event.trackId];
  tracks[event.trackId] = {
    playing: track?.playing || false,
    time: track?.time || 0,
    dirty: true,
  };

  if (event.type === "clip") {
    const clip = clips[event.clipId];

    clips[event.clipId] = {
      playing: clip?.playing || false,
      time: clip?.time || 0,
      dirty: true,
    };
  }

  const lastCommand = state.commands.length;
  const newState = { ...state, clips, tracks, lastCommand };
  newState.queued.push(event);
  return newState;
};
