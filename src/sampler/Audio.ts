export interface AudioTrackProperties {
  volume: number;
}
export interface AudioSourceProperties {
  buffer: any;
}

// tslint:disable-next-line: no-empty-interface
export interface AudioTrack {
  disconnect(): void;
}

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
