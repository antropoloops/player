import debug from "debug";

const log = debug("atpls:audio");

export interface AudioTrackProperties {
  volume: number;
}
export interface AudioSourceProperties {
  buffer: any;
}

// tslint:disable-next-line: no-empty-interface
export interface AudioTrack {}

export interface AudioSource {
  start: (time: number) => void;
  stop: (time: number) => void;
}

export interface AudioEngine {
  createTrack: (
    name: string,
    props: AudioTrackProperties,
    destination?: any,
  ) => AudioTrack;
  createAudioSource: (
    props: AudioSourceProperties,
    destination: any,
  ) => AudioSource;
}

export class DebugAudioEngine implements AudioEngine {
  public createTrack(
    name: string,
    props: AudioTrackProperties,
    destination?: any,
  ) {
    return {};
  }
  public createAudioSource(props: AudioSourceProperties, destination: any) {
    return new NoAudioSource();
  }
}

export class NoAudioTrack implements AudioTrack {}

export class NoAudioSource implements AudioSource {
  public start(time: number) {
    log("start", time);
  }
  public stop(time: number) {
    log("stop", time);
  }
}
