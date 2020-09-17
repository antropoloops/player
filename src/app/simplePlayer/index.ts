import { Audioset, EmptyAudioset } from "../../audioset";
import {
  PlayerAction,
  PlayerState,
  PlayStatus,
  InitAction,
  TriggerAction,
} from "./types";
import polyphonic from "./polyphonic";
import monophonic from "./monophonic";

export const StoppedStatus: PlayStatus = {
  playing: false,
  time: 0,
  dirty: false,
};

export function createInitialState(audioset?: Audioset) {
  return init(undefined, { type: "init", audioset });
}

export function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "init":
      return init(state, action);
    case "tick":
      if (state.queued.length === 0) return state;
      const isPoly = state.audioset.audio.mode === "1"; // FIXME: change to a name
      return isPoly ? polyphonic(state, action) : monophonic(state, action);
    case "trigger":
      return trigger(state, action);
  }
}

const init = (
  state: PlayerState | undefined,
  action: InitAction
): PlayerState => {
  return {
    startAt: 0,
    lastTickAt: 0,
    audioset: action.audioset || EmptyAudioset,
    queued: [],
    clips: {},
    tracks: {},
    commands: [],
  };
};

const trigger = (state: PlayerState, action: TriggerAction): PlayerState => {
  const { clipId, trackId } = action;
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };

  clips[clipId] = Object.assign({}, clips[clipId], {
    dirty: true,
  });
  tracks[trackId] = Object.assign({}, tracks[trackId], {
    dirty: true,
  });

  const newState = { ...state, clips, tracks };
  newState.queued.push(action);
  return newState;
};
