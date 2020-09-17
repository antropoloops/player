import { useEffect, useReducer } from "react";
import { Audioset, EmptyAudioset } from "../../audioset";
import useAudioContext from "./useAudioContext";

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
      () => dispatch({ type: "tick", time: context?.currentTime || 0 }),
      100
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

type TickAction = { type: "tick"; time: number };

const tick = (state: PlayerState, action: TickAction): PlayerState => {
  if (state.queued.length === 0) return state;

  const startAt = state.startAt || action.time;
  const time = action.time - startAt;

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
      const track = state.audioset.index.trackById[trackId];
      track.clipIds.forEach((clipId) => {
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
