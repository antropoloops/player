import nextBeat from "./nextBeat";

const noop = () => undefined;
export const EVENTS = {
  audioClipStarted: noop
};

export default function Sampler(ctx, audioset, events) {
  const bpm = audioset.audio.bpm || 120;
  const startedAt = null;
  const sources = {};
  const output = createMasterOutput(ctx, 0.4);

  function start(clipId, time) {
    console.log("[sampler] START", clipId, time);
    time = time || nextBeat(ctx.currentTime, startedAt, bpm);
    const clip = audioset.clips[clipId];
    if (!clip || !clip.audioBuffer) console.warn("No buffer", clipId, clip);

    const source = (sources[clipId] = ctx.createBufferSource());
    source.buffer = clip.audioBuffer;
    source.loop = true;
    source.connect(output);
    source.start(time);
  }
  function stop(clipId, time) {
    console.log("[sampler] STOP", clipId, time);
    const source = sources[clipId];
    if (!source) return;
    time = time || ctx.currentTime;
    source.stop(time);
    sources[clipId] = null;
  }

  function stopAll() {
    const now = ctx.currentTime;
    Object.keys(sources).forEach(clipId => stop(clipId, now));
  }
  return { start, stop, stopAll };
}

function createMasterOutput(ctx, gain) {
  const output = ctx.createGain();
  output.gain.value = gain;
  output.connect(ctx.destination);
  return output;
}
