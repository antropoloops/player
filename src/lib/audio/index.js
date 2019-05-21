import Sampler from "./Sampler";
import context from "./context";
export { default as context, unlockAudioContext } from "./context";

export const currentTime = () => context().currentTime;

export function initAudio() {
  console.log("init audio");
  const ctx = context();
  if (typeof ctx.resume === "function") {
    return ctx.resume().then(() => ctx);
  } else {
    return Promise.resolve(ctx);
  }
}

const EVENTS = {
  onAudioStarted(time) {},
  onAudioClipStarted(clipId, trackId, time) {},
  onAudioClipStopeed(clipId, trackId, time) {},
  onAudioStopped(time) {}
};
export default function createAudio(audioset, buffers) {
  console.log("Create audio", audioset.id);
  return initAudio().then(ctx => {
    console.log("Creating Sampler...");

    const events = Object.assign({}, EVENTS);
    const sampler = Sampler(ctx, audioset, events);

    return sampler;
  });
}
