import debug from "debug";
import { quantize } from "../time";
const log = debug("atpls:sync:reducer");

const calcNextTick = (action, s) =>
  action.time + quantize(s.bpm, action.time, s.startedAt, s.quantize);

// actions creators
export const start = (clipId, time) => ({ type: "start", clipId, time });
export const stop = (clipId, time) => ({ type: "stop", clipId, time });
export const togglePlay = (clipId, time) => ({
  type: "togglePlay",
  clipId,
  time
});
export const stopAll = time => ({ type: "stopAll", time });
export const receiveAction = (message, userId) => ({
  type: "receiveAction",
  message,
  userId
});

// filter predicates
const removeClipsInSameTrackOf = clip => c => clip.trackId !== c.trackId;
const removeTrackOf = clip => t => clip.trackId !== t.id;
const removeClip = clip => c => clip.id !== c.id;

export default function createReducer(audioset, currentTime) {
  const $c = name => audioset.clips[name];
  const $t = id => audioset.tracks.find(t => t.id === id);

  const initialState = () => ({
    bpm: audioset.audio.bpm || 120,
    quantize: audioset.audio.quantize || false,
    startedAt: null,
    nextTick: null,
    clips: [],
    tracks: []
  });

  return function reducer(state = initialState(), action = {}) {
    log("ACTION %o", action);
    const { type, clipId } = action;
    const clip = $c(clipId);
    let clips, tracks, startedAt, nextTick;

    switch (type) {
      // an external message from socket server
      case "receiveAction":
        return reducer(state, action.message);

      case "togglePlay":
        if (!clip) return state;
        return state.clips.find(c => c === clip)
          ? reducer(state, stop(clipId, action.time))
          : reducer(state, start(clipId, action.time));

      case "start":
        if (!clip) return state;
        startedAt = state.startedAt || currentTime();
        clips = state.clips.filter(removeClipsInSameTrackOf(clip)).concat(clip);
        tracks = state.tracks
          .filter(removeTrackOf(clip))
          .concat($t(clip.trackId));
        nextTick = state.quantize && calcNextTick(action, state);
        return { ...state, startedAt, clips, tracks, nextTick };

      case "stop":
        if (!clip) return state;
        clips = state.clips.filter(removeClip(clip));
        tracks = state.tracks.filter(removeTrackOf(clip));
        startedAt = clips.length ? state.startedAt : null;
        nextTick = calcNextTick(action, state);
        return { ...state, startedAt, clips, tracks, nextTick };

      case "stopAll":
        return initialState();

      default:
        return state;
    }
  };
}
