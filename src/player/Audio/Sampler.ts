import debug from "debug";
import { Audioset } from "../../audioset";
import { ControlCommand } from "../Control";
import { AudioEngine, AudioSource, AudioTrack } from "./Audio";

const log = debug("atpls:sampler");

export interface SampleBuffers {
  getBuffer(clipId: string): any;
}

export class Sampler {
  private master: AudioTrack;
  private tracks: Record<string, AudioTrack> = {};
  private audioSources: Record<string, AudioSource | undefined> = {};

  constructor(
    private audioset: Audioset,
    private buffers: SampleBuffers,
    private audio: AudioEngine,
  ) {
    log("create sampler %s", audioset.meta.title);
    this.master = audio.createTrack("master", { volume: 0.8 });
    audioset.tracks.forEach(track => {
      this.tracks[track.id] = audio.createTrack(
        track.name,
        { volume: 1 },
        this.master,
      );
    });
  }

  public dispose() {
    Object.keys(this.tracks).forEach(trackId => {
      this.tracks[trackId].disconnect();
    });
  }

  public run(command: ControlCommand) {
    switch (command.command) {
      case "startClip":
        return this.start(command.clipId, command.time);
      case "stopClip":
        return this.stop(command.clipId, command.time);
      default:
    }
  }

  public start(clipId: string, time: number) {
    log("start %s", clipId);
    if (this.audioSources[clipId]) {
      return;
    }

    const buffer = this.buffers.getBuffer(clipId);
    const trackId = this.audioset.index.trackIdOfClip[clipId];
    const track = this.tracks[trackId];
    const source = this.audio.createAudioSource({ buffer }, track);
    this.audioSources[clipId] = source;

    source.start(time);
  }

  public stop(clipId: string, time: number) {
    log("stop %s", clipId);
    const source = this.audioSources[clipId];
    if (source !== undefined) {
      source.stop(time);
    }
    this.audioSources[clipId] = undefined;
  }
}
