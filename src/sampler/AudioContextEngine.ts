import { IAudioContext } from "standardized-audio-context";
import {
  AudioEngine,
  AudioSource,
  AudioSourceProperties,
  AudioTrack,
  AudioTrackProperties,
} from "./Audio";

export class AudioContextEngine implements AudioEngine {
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
  public createTrack(
    name: string,
    props: AudioTrackProperties,
    destination?: any,
  ): AudioTrack {
    const track = this.context.createGain();
    track.gain.value = props.volume;
    track.connect(destination || this.context.destination);
    return track;
  }
}
