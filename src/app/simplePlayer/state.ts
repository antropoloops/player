import { Audioset, EmptyAudioset } from "../../audioset";
import { PlayerAction, InitAction, EventAction } from "./actions";
import { PlayerCommand } from "./commands";
import { PlayStatus } from "./status";
import polyphonic from "./polyphonic";
import monophonic from "./monophonic";
import { PlayerEvent } from "./events";

type TrackId = string;
type ClipId = string;

export type PlayerState = {
  startAt: number;
  lastTickAt: number;
  audioset: Audioset;
  queued: Array<PlayerEvent>;
  clips: Record<ClipId, PlayStatus>;
  tracks: Record<TrackId, PlayStatus>;
  commands: PlayerCommand[];
  lastCommand: number;
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
    case "event":
      return enqueue(state, action);
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

const enqueue = (state: PlayerState, action: EventAction): PlayerState => {
  const { clipId, trackId } = action.event;
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
  newState.queued.push(action.event);
  return newState;
};
