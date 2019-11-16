import {
  AudioEngine,
  AudioSource,
  AudioSourceProperties,
  AudioTrack,
  AudioTrackProperties,
} from "./Audio";

export class AudioContextEngine implements AudioEngine {
  constructor(private context: AudioContext) {}

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
  public createTrack(
    props: AudioTrackProperties,
    destination?: any,
  ): AudioTrack {
    const node = this.context.createGain();
    node.connect(destination || this.context.destination);
    return node;
  }
}
