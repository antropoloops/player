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
    const node = this.context.createBufferSource();
    node.buffer = props.buffer;
    node.connect(destination);
    return node;
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
