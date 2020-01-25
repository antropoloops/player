import { IAudioContext } from "standardized-audio-context";
import {
  AudioEngine,
  AudioSource,
  AudioTrack,
  createAudioEngine,
} from "./AudioEngine";

/**
 * Sampler: the audio player
 */
export interface Sampler {
  connect(): void;
  disconnect(): void;
  createTrack(track: SamplerTrack): void;
  start(clipId: string, trackId: string, time: number): void;
  stop(clipId: string, time: number): void;
}

export interface SampleBuffers {
  getBuffer(clipId: string): any;
}

export function createSampler(
  buffers: SampleBuffers,
  ctx: IAudioContext,
): Sampler {
  const audio = createAudioEngine(ctx);
  return new AudioSampler(buffers, audio);
}

export interface SamplerTrack {
  id: string;
  name: string;
  volume?: number;
}

class AudioSampler implements Sampler {
  public master: AudioTrack;
  private tracks: Record<string, AudioTrack> = {};
  private audioSources: Record<string, AudioSource | undefined> = {};

  constructor(private buffers: SampleBuffers, private audio: AudioEngine) {
    this.master = this.audio.createTrack({
      output: audio.output,
      volume: 0.2,
    });
  }

  public createTrack(track: SamplerTrack) {
    const audioTrack = this.audio.createTrack({
      volume: 1,
      output: this.master,
      ...track,
    });
    this.tracks[track.id] = audioTrack;
    return track.id;
  }

  public connect() {
    // nothing to do?
  }

  public disconnect() {
    Object.keys(this.tracks).forEach(trackId => {
      this.tracks[trackId].disconnect();
    });
    this.master.disconnect();
  }

  public start(clipId: string, trackId: string, time: number) {
    if (this.audioSources[clipId]) {
      return;
    }
    const buffer = this.buffers.getBuffer(clipId);
    const track = this.tracks[trackId];
    const source = this.audio.createAudioSource({ output: track, buffer });
    this.audioSources[clipId] = source;
    source.start(time);
  }

  public stop(clipId: string, time: number) {
    const source = this.audioSources[clipId];
    if (source !== undefined) {
      source.stop(time);
    }
    this.audioSources[clipId] = undefined;
  }
}
