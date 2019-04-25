import createReducer, { start, stop } from "./reducer";
import { migrateAudioset } from "../audioset";
import audioset from "../static/audiosets/test.audioset.json";

let time = 0;
const reducer = createReducer(migrateAudioset(audioset), () => time);

// simplify the state for human matching
const simplified = state => ({
  ...state,
  clips: state.clips.map(c => c.id),
  tracks: state.tracks.map(t => t.id)
});

describe("Sync reducer", () => {
  it("has initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      bpm: 110,
      startedAt: null,
      tracks: [],
      clips: []
    });
  });
  it("stops tracks one by one", () => {
    const state1 = reducer(undefined, start("voice1"));
    const state2 = reducer(state1, start("melody1"));
    const state3 = reducer(state2, stop("voice1"));
    expect(simplified(state3)).toEqual({
      bpm: 110,
      startedAt: 0,
      clips: ["melody1"],
      tracks: ["melody"]
    });
    const state4 = reducer(state3, stop("melody1"));
    expect(simplified(state4)).toEqual({
      bpm: 110,
      startedAt: null,
      clips: [],
      tracks: []
    });
  });
  it("starts one clip per track", () => {
    const state1 = reducer(undefined, start("voice1"));
    expect(simplified(state1)).toEqual({
      bpm: 110,
      startedAt: 0,
      clips: ["voice1"],
      tracks: ["voice"]
    });
    // start from other track
    const state2 = reducer(state1, start("melody1"));
    expect(simplified(state2)).toEqual({
      bpm: 110,
      clips: ["voice1", "melody1"],
      startedAt: 0,
      tracks: ["voice", "melody"]
    });
    // // start from same track
    const state3 = reducer(state2, start("voice2"));
    expect(simplified(state3)).toEqual({
      bpm: 110,
      clips: ["melody1", "voice2"],
      startedAt: 0,
      tracks: ["melody", "voice"]
    });
  });
});
