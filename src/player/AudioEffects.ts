import debug from "debug";
import { IAudioContext } from "standardized-audio-context";
import { Audioset } from "../audioset";
import { createSampler, SampleBuffers, Sampler } from "../sampler";
import { ControlCommand, Effects } from "./Control";

const log = debug("atpls:sampler");

export function createAudioEffects(
  audioset: Audioset,
  ctx: IAudioContext,
  buffers: SampleBuffers,
): AudioEffects {
  return new AudioEffects(audioset, ctx, buffers);
}

class AudioEffects implements Effects {
  public sampler: Sampler;
  constructor(
    private audioset: Audioset,
    ctx: IAudioContext,
    buffers: SampleBuffers,
  ) {
    log("init AudioEffects %s", audioset.meta.title);
    this.sampler = createSampler(buffers, ctx);
    this.sampler.initTracks(audioset.tracks);
  }

  public attach() {
    // nothing to do?
  }

  public detach() {
    this.sampler.disconnect();
  }

  public run(command: ControlCommand) {
    const time = command.time;
    switch (command.command) {
      case "startClip":
        const clipId = command.clipId;
        const trackId = this.audioset.index.trackIdOfClip[clipId];
        log("start %s", clipId);
        return this.sampler.start(clipId, trackId, time);
      case "stopClip":
        log("stop %s", command.clipId);
        return this.sampler.stop(command.clipId, time);
      default:
    }
  }
}
