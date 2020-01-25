import { IAudioContext } from "standardized-audio-context";

/**
 * Creates an AudioEngine instance
 * @param context
 */
export function createAudioEngine(context: IAudioContext): AudioEngine {
  return new AudioContextEngine(context);
}

export interface AudioTrackProps {
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
  createTrack: (props: AudioTrackProps, destination?: any) => AudioTrack;
  createAudioSource: (
    props: AudioSourceProperties,
    destination: any,
  ) => AudioSource;
}

class AudioContextEngine implements AudioEngine {
  constructor(private context: IAudioContext) {}

  public createAudioSource(
    props: AudioSourceProperties,
    destination: any,
  ): AudioSource {
    const source = this.context.createBufferSource();
    source.buffer = props.buffer;
    source.loop = true;
    source.connect(destination);
    return source;
  }
  public createTrack(props: AudioTrackProps, destination?: any): AudioTrack {
    const track = this.context.createGain();
    track.gain.value = props.volume;
    track.connect(destination || this.context.destination);
    return track;
  }
}
