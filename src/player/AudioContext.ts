import debug from "debug";
import { AudioContext } from "standardized-audio-context";

const log = debug("atpls:context");

type ResolveContext = (value: AudioContext) => void;
const activeListeners: ResolveContext[] = [];
const context = new AudioContext();
context.onstatechange = handleStateChange;

handleStateChange();

function handleStateChange() {
  const state = context.state;
  log("state %s", state);
  if (state === "running") {
    const listeners = activeListeners.slice();
    activeListeners.length = 0;
    listeners.forEach(listener => listener(context));
  }
}

export function autoUnlockAudio() {
  function unlock() {
    context.resume().then(detach);
  }

  function detach() {
    // Remove the touch start listener.
    log("detach auto unlock", context.state);
    document.removeEventListener("touchstart", unlock, true);
    document.removeEventListener("touchend", unlock, true);
    document.removeEventListener("click", unlock, true);
  }

  // Setup a touch start listener to attempt an unlock in.
  log("attach auto unlock");
  document.addEventListener("touchstart", unlock, true);
  document.addEventListener("touchend", unlock, true);
  document.addEventListener("click", unlock, true);
}

/**
 * @see https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
 */
export function getActiveAudioContext(): Promise<AudioContext> {
  if (context.state === "running") {
    return Promise.resolve(context);
  } else {
    return new Promise<AudioContext>(resolve => {
      activeListeners.push(resolve);
    });
  }
}
