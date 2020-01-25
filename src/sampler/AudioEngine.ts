import { IAudioContext } from "standardized-audio-context";

/**
 * Creates an AudioEngine instance
 * @param context
 */
export function createAudioEngine(context: IAudioContext): AudioEngine {
  return new AudioContextEngine(context);
}

export interface AudioTrackProps {
  output: any;
  volume: number;
}
export interface AudioSourceProperties {
  output: any;
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
  output: any;
  createTrack: (props: AudioTrackProps) => AudioTrack;
  createAudioSource: (props: AudioSourceProperties) => AudioSource;
}

class AudioContextEngine implements AudioEngine {
  public output: any;
  constructor(private context: IAudioContext) {
    this.output = context.destination;
  }

  public createAudioSource(props: AudioSourceProperties): AudioSource {
    const source = this.context.createBufferSource();
    source.buffer = props.buffer;
    source.loop = true;
    source.connect(props.output);
    return source;
  }
  public createTrack(props: AudioTrackProps): AudioTrack {
    const track = this.context.createGain();
    track.gain.value = props.volume;
    track.connect(props.output);
    return track;
  }
}
