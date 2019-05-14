import debug from "debug";
import createReducer from "./reducer";
import diff from "./diff";
import Emitter from "tiny-emitter";

export { start, stop, stopAll, receiveAction, togglePlay } from "./reducer";

const log = debug("atpls:sync");

/**
 * This is the GLOBAL state of the app. Like redux
 * @param {*} audioset
 * @param {*} setState
 * @param {*} now
 */
export default function createSync(audioset, now) {
  log("create sync");
  let events = new Emitter();
  const reducer = createReducer(audioset, now);
  let state = reducer(undefined, { type: "init" });
  const effects = [];

  const setState = state => events && events.emit("state", state);
  const subscribe = fn => events && events.on("state", fn);

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
    events = null;
    effects.forEach(effect => {
      if (effect.detach) effect.detach();
    });
    effects.length = 0;
  }

  return { dispatch, addEffect, detach, subscribe };
}
