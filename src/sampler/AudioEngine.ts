import { IAudioContext, IAudioNode } from "standardized-audio-context";

type AudioNode = IAudioNode<IAudioContext>;
/**
 * Creates an AudioEngine instance
 * @param context
 */
export function createAudioEngine(context: IAudioContext): AudioEngine {
  return new AudioContextEngine(context);
}
export interface AudioEngine {
  output: AudioNode;
  createTrack: (props: AudioTrackProps) => AudioTrack;
  createAudioSource: (props: AudioSourceProperties) => AudioSource;
}

export interface AudioTrackProps {
  output: AudioNode;
  volume: number;
}
export interface AudioSourceProperties {
  output: AudioNode;
  buffer: any;
}

export interface AudioTrack {
  input: AudioNode;
  disconnect(): void;
}

export interface AudioSource {
  start: (time: number) => void;
  stop: (time: number) => void;
}

class AudioContextEngine implements AudioEngine {
  public output: any;
  constructor(private context: IAudioContext) {
    this.output = context.destination;
  }

  public createAudioSource(props: AudioSourceProperties): AudioSource {
    const source = this.context.createBufferSource();
    source.buffer =
      props.buffer || this.context.createBuffer(2, 10, this.context.sampleRate);
    source.loop = true;
    source.connect(props.output);
    return source;
  }
  public createTrack(props: AudioTrackProps): AudioTrack {
    const track = this.context.createGain();
    track.gain.value = props.volume || 0.7;
    track.connect(props.output);
    return { input: track, disconnect: () => track.disconnect() };
  }
}
