import debug from "debug";
import createReducer from "./reducer";
import diff from "./diff";

export { start, stop, stopAll, receiveAction } from "./reducer";

const log = debug("atpls:sync");

/**
 * This is the GLOBAL state of the app. Like redux
 * @param {*} audioset
 * @param {*} setState
 * @param {*} now
 */
export default function createSync(audioset, setState, now) {
  log("create sync");
  const reducer = createReducer(audioset, now);
  let state = reducer(undefined, { type: "init" });
  const effects = [];

  function addEffect(effect) {
    if (typeof effect === "function") effect = effect();
    effects.push(effect);
  }

  function dispatch(action) {
    log("dispatch %o", action);
    const newState = reducer(state, action);
    const changes = diff(state.clips, newState.clips);
    //debug(state, newState, changes, action);
    effects.forEach(effect => {
      changes.delete.forEach(clipId => effect.stop(clipId));
      changes.create.forEach(clipId => effect.start(clipId));
    });
    state = newState;
    setState(state);
  }

  function detach() {
    log("detach!");
    effects.forEach(effect => {
      if (effect.detach) effect.detach();
    });
    effects.length = 0;
  }

  return { dispatch, addEffect, detach };
}
