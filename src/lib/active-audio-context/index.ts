import debug from "debug";
import { AudioContext } from "standardized-audio-context";
import decodeAudioBuffer from "./decodeAudioBuffer";
import unmute from "./unmute";

const log = debug("atpls:context");

type ResolveContext = (value: AudioContext) => void;
const activeListeners: ResolveContext[] = [];
const context = new AudioContext();
context.onstatechange = handleStateChange;

export function isAudioContextActive() {
  return context.state === "running";
}

export async function loadAudio(url: string) {
  const context = await getActiveAudioContext();
  const response = await fetch(url);
  const buffer = await decodeAudioBuffer(response, context);

  return { context, buffer };
}

/**
 * Waits until the AudioContext is in "running" state
 *
 * @see https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
 */
export function getActiveAudioContext(): Promise<AudioContext> {
  if (context.state === "running") {
    return Promise.resolve(context);
  } else {
    return new Promise<AudioContext>((resolve) => {
      activeListeners.push(resolve);
    });
  }
}

export function autoUnlockAudio() {
  if (context.state !== "suspended") return;

  return new Promise((resolve) => {
    function unlock() {
      unmute(context);
      const prevHandler = context.onstatechange;
      // FIXME: think better how to fix this
      context.onstatechange = (args) => {
        handleStateChange();
        if (prevHandler) {
          prevHandler(args);
        }
      };
      context.resume().then(detach).then(resolve);
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
  });
}

function handleStateChange() {
  const state = context.state;
  log("state %s", state);
  if (state === "running") {
    const listeners = activeListeners.slice();
    activeListeners.length = 0;
    listeners.forEach((listener) => listener(context));
  }
}

handleStateChange();
