import { Audioset } from "../audioset";
import {
  Effect,
  Status4,
  startClipPoly,
  Command,
  stopClip,
  stopTrack,
  stopAll,
  ClipStatus4,
  TrackStatus4,
} from "./commands";

export type State4 = {
  audioset: Audioset;
  status: Status4;
  effects: Effect[];
};

export const createInitialState = (audioset: Audioset): State4 => {
  const clips = audioset.clips.reduce((clips, clip) => {
    clips[clip.id] = { playing: false, time: 0 };
    return clips;
  }, {} as Record<string, ClipStatus4>);
  const tracks = audioset.tracks.reduce((tracks, track) => {
    tracks[track.id] = { playing: false, time: 0 };
    return tracks;
  }, {} as Record<string, TrackStatus4>);

  return { audioset, status: { clips, tracks }, effects: [] };
};

type StartClipAction = { type: "clip:start"; time: number; clipId: string };
type StopClipAction = { type: "clip:stop"; time: number; clipId: string };
type StopTrackAction = { type: "track:stop"; time: number; trackId: string };
type StopAllAction = { type: "all:stop"; time: number };

type Action =
  | StartClipAction
  | StopClipAction
  | StopTrackAction
  | StopAllAction;

export function reducer(state: State4, action: Action): State4 {
  switch (action.type) {
    case "clip:start":
      return execute(state, startClipPoly(action.clipId, action.time));
    case "clip:stop":
      return execute(state, stopClip(action.clipId, action.time));
    case "track:stop":
      return execute(state, stopTrack(action.trackId, action.time));
    case "all:stop":
      return execute(state, stopAll(action.time));
  }
}

function execute(state: State4, command: Command): State4 {
  const effects = command(state.audioset, state.status);

  const status = { ...state.status };
  for (const effect of effects) {
    if (effect.type === "clip:play") {
      status.clips[effect.clipId] = {
        playing: effect.play,
        time: effect.time,
      };
    } else if (effect.type === "track:play") {
      status.tracks[effect.trackId] = {
        playing: effect.play,
        time: effect.time,
      };
    }
  }
  return { ...state, status, effects };
}
