import { off } from "process";
import { useEffect, useReducer } from "react";
import { Audioset, EmptyAudioset } from "../../audioset";
import useAudioContext from "./useAudioContext";

const INTERVAL_MS = 100;
const INTERVAL_SECS = INTERVAL_MS / 1000;

function useSimplePlayer(audioset?: Audioset) {
  const context = useAudioContext();
  const stateAndDispatch = useReducer(
    reducer,
    init(undefined, { type: "init", audioset })
  );
  const dispatch = stateAndDispatch[1];

  useEffect(() => {
    dispatch({ type: "init", audioset });
  }, [dispatch, audioset]);

  useEffect(() => {
    const id = setInterval(
      () =>
        dispatch({
          type: "tick",
          time: context?.currentTime || 0,
          length: INTERVAL_SECS,
        }),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [dispatch, context]);

  return stateAndDispatch;
}

export default useSimplePlayer;

export type PlayStatus = {
  playing: boolean;
  time: number;
  dirty?: boolean;
};

export const StoppedStatus: PlayStatus = {
  playing: false,
  time: 0,
  dirty: false,
};

type TrackId = string;
type ClipId = string;

export type PlayerState = {
  startAt: number;
  audioset: Audioset;
  queued: Array<TriggerAction>;
  clips: Record<ClipId, PlayStatus>;
  tracks: Record<TrackId, PlayStatus>;
};

type InitAction = { type: "init"; audioset?: Audioset };
const init = (
  state: PlayerState | undefined,
  action: InitAction
): PlayerState => {
  return {
    startAt: 0,
    audioset: action.audioset || EmptyAudioset,
    queued: [],
    clips: {},
    tracks: {},
  };
};

type TriggerAction = {
  type: "trigger";
  playing: boolean;
  clipId: string;
  trackId: string;
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

type TickAction = { type: "tick"; time: number; length: number };

const tick = (state: PlayerState, action: TickAction): PlayerState => {
  if (state.queued.length === 0) return state;

  const bpm = state.audioset.audio.bpm;
  const quantize = state.audioset.audio.quantize;
  const startAt = state.startAt || action.time;
  const offset =
    startAt === action.time
      ? 0
      : quantizeTime(bpm, action.time, startAt, quantize);

  if (offset > 2 * action.length) return state;

  const time = action.time + offset;

  const clips = { ...state.clips };
  const tracks = { ...state.tracks };
  state.queued.forEach((action) => {
    const { clipId, trackId, playing } = action;
    clips[clipId] = { playing, time };

    if (playing) {
      // start the track
      if (!tracks[trackId]?.playing) {
        tracks[trackId] = { playing: true, time };
      }
      // stop other clips in the same track
      const trackData = state.audioset.index.trackById[trackId];
      trackData.clipIds.forEach((clipId) => {
        if (clipId !== action.clipId && clips[clipId]?.playing) {
          clips[clipId] = { playing: false, time };
        }
      });
    } else {
      // stop the track
      if (tracks[trackId]?.playing) {
        tracks[trackId] = { playing: false, time };
      }
    }
  });
  return {
    ...state,
    startAt,
    clips,
    tracks,
    queued: [],
  };
};

export type Action = InitAction | TriggerAction | TickAction;
function reducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "init":
      return init(state, action);
    case "tick":
      return tick(state, action);
    case "trigger":
      return trigger(state, action);
  }
}
/**
 * Calculate the time remaining until the next beat
 *
 * @param {*} bpm
 * @param {*} now
 * @param {*} startedAt
 * @param {*} beats
 */
function quantizeTime(
  bpm: number,
  now: number,
  startedAt: number,
  beats = 1
): number {
  const factor = bpm / (60 * beats);
  const absolute = now - startedAt;
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  return offsetTime;
}
