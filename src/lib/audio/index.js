import Sampler from "./Sampler";
import context, { unlockAudioContext } from "./context";
export { default as fetchAudioBuffers } from "./fetchAudioBuffers";
export { default as context, unlockAudioContext } from "./context";

export const currentTime = () => context().currentTime;

const EVENTS = {
  onAudioStarted(time) {},
  onAudioClipStarted(clipId, trackId, time) {},
  onAudioClipStopeed(clipId, trackId, time) {},
  onAudioStopped(time) {}
};
export default function createAudioEffects(audioset) {
  return unlockAudioContext().then(ctx => {
    const events = Object.assign({}, EVENTS);
    const sampler = Sampler(ctx, audioset, events);

    return sampler;
  });
}
