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
  initTracks(tracks: SamplerTrack[]): void;
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
  return new AudioSampler(buffers, ctx);
}

export interface SamplerTrack {
  id: string;
  name: string;
  volume?: number;
}

export class AudioSampler implements Sampler {
  public master: AudioTrack;
  private tracks: Record<string, AudioTrack> = {};
  private audioSources: Record<string, AudioSource | undefined> = {};
  private audio: AudioEngine;

  constructor(private buffers: SampleBuffers, ctx: IAudioContext) {
    this.audio = createAudioEngine(ctx);
    this.master = this.audio.createTrack({ volume: 0.8 });
  }
  public initTracks(tracks: SamplerTrack[]) {
    tracks.forEach(track => {
      this.tracks[track.id] = this.audio.createTrack(
        { volume: 1 },
        this.master,
      );
    });
  }
  public connect() {
    // nothing to do?
  }
  public disconnect() {
    Object.keys(this.tracks).forEach(trackId => {
      this.tracks[trackId].disconnect();
    });
  }
  public start(clipId: string, trackId: string, time: number) {
    if (this.audioSources[clipId]) {
      return;
    }
    const buffer = this.buffers.getBuffer(clipId);
    const track = this.tracks[trackId];
    const source = this.audio.createAudioSource({ buffer }, track);
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
