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
    lastCommand: 0,
  };
};

const trigger = (state: PlayerState, action: TriggerAction): PlayerState => {
  const { clipId, trackId } = action;
  const clips = { ...state.clips };
  const tracks = { ...state.tracks };

  const clip = clips[clipId];
  const track = tracks[trackId];

  clips[clipId] = {
    playing: clip?.playing || false,
    time: clip?.time || 0,
    dirty: true,
  };
  tracks[trackId] = {
    playing: track?.playing || false,
    time: track?.time || 0,
    dirty: true,
  };

  const lastCommand = state.commands.length;
  const newState = { ...state, clips, tracks, lastCommand };
  newState.queued.push(action);
  return newState;
};
