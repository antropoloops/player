import debug from "debug";
const log = debug("atpls:sync:reducer");

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
const removeClip = clip => c => clip.name !== c.name;

export default function createReducer(audioset, currentTime) {
  const $c = name => audioset.clips[name];
  const $t = id => audioset.tracks.find(t => t.id === id);

  const initialState = () => ({
    bpm: audioset.audio.bpm || 120,
    startedAt: null,
    clips: [],
    tracks: []
  });

  return function reducer(state = initialState(), action = {}) {
    log("ACTION %o", action);
    const { type, clipId } = action;
    const clip = $c(clipId);
    let clips, tracks, startedAt;

    switch (type) {
      // an external message from socket server
      case "receiveAction":
        return reducer(state, action.message);

      case "togglePlay":
        if (!clip) return state;
        return state.clips.find(c => c === clip)
          ? reducer(state, stop(clipId))
          : reducer(state, start(clipId));

      case "start":
        if (!clip) return state;
        startedAt = state.startedAt || currentTime();
        clips = state.clips.filter(removeClipsInSameTrackOf(clip)).concat(clip);
        tracks = state.tracks
          .filter(removeTrackOf(clip))
          .concat($t(clip.trackId));
        return { ...state, startedAt, clips, tracks };

      case "stop":
        if (!clip) return state;
        clips = state.clips.filter(removeClip(clip));
        tracks = state.tracks.filter(removeTrackOf(clip));
        startedAt = clips.length ? state.startedAt : null;
        return { ...state, startedAt, clips, tracks };

      case "stopAll":
        return initialState();

      default:
        console.warn("unknown action", action);
        return state;
    }
  };
}
