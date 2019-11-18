import { Audioset, AudiosetData, EmptyAudioset } from "../audioset";
import { AudiosetLoader, AudiosetLoadStatus } from "../audioset/AudiosetLoader";
import { AudioEngine, DebugAudioEngine } from "./Audio";
import {
  AudiosetControl,
  ControlCommand,
  ControlListener,
  ControlState,
} from "./AudiosetControl";
import { Emitter, Listener } from "./Emitter";
import { ResourceLoader, ResourceLoadStatus } from "./ResourceLoader";
import { Sampler } from "./Sampler";

/**
 * A player is the facade for the rest of the components:
 * - Loader: load audioset and resources
 * - Control: determines how to play clips
 * - Pads: receive pad events
 * - Params: receive param change events
 * - Keyboard: receive keyboard events
 * - Sampler: play the audio
 */
export class Player {
  public readonly loader: AudiosetLoader;
  public control: AudiosetControl;
  public resources: ResourceLoader;

  // private //
  private sampler: Sampler;

  private noSampler: Sampler;
  private noControl: AudiosetControl;
  private noResources: ResourceLoader;

  private readonly controlListener: ControlListener;
  private readonly resourceListener: (status: ResourceLoadStatus) => void;

  private readonly audiosetChanged = new Emitter<AudiosetData>();
  private readonly audiosetLoadStatusChanged = new Emitter<
    AudiosetLoadStatus
  >();
  private readonly controlStateChanged = new Emitter<ControlState>();
  private readonly controlCommand = new Emitter<ControlCommand>();
  private readonly resourceStatusChanged = new Emitter<ResourceLoadStatus>();

  private audio: AudioEngine = new DebugAudioEngine();
  private audioset: Audioset = EmptyAudioset;

  constructor() {
    this.loader = new AudiosetLoader(status =>
      this.setAudiosetLoadStatus(status),
    );
    this.controlListener = {
      onControlStateChanged: state => this.emitControlState(state),
      onControlCommand: command => this.runCommand(command),
    };
    this.resourceListener = (status: ResourceLoadStatus) => {
      this.resourceStatusChanged.emit(status);
    };
    this.noControl = this.control = new AudiosetControl(
      this.audioset,
      this.controlListener,
    );
    this.noResources = this.resources = new ResourceLoader(
      this.audioset,
      this.resourceListener,
    );
    this.noSampler = this.sampler = new Sampler(
      this.audioset,
      this.resources,
      this.audio,
    );
  }

  public setAudioEngine(audio: AudioEngine) {
    this.audio = audio;
    // this.sampler.dispose()
    this.sampler = new Sampler(this.audioset, this.resources, this.audio);
  }

  public onResourceStatusChanged(listener: Listener<ResourceLoadStatus>) {
    return this.resourceStatusChanged.on(listener);
  }

  public onControlStateChanged(listener: Listener<ControlState>) {
    return this.controlStateChanged.on(listener);
  }

  public onCommand(listener: Listener<ControlCommand>) {
    return this.controlCommand.on(listener);
  }

  //// PRIVATE /////

  // allow pub/sub of contro state
  private emitControlState(controlState: ControlState) {
    this.controlStateChanged.emit(controlState);
  }

  // allows pub/sub of commands (for visuals)
  private runCommand(command: ControlCommand) {
    this.sampler.run(command);
    this.controlCommand.emit(command);
  }
  private setAudiosetLoadStatus(status: AudiosetLoadStatus) {
    this.audiosetLoadStatusChanged.emit(status);
    if (status.status === "ready") {
      this.setDelegates(status.audioset);
      this.audiosetChanged.emit(status.audioset);
    }
  }

  private setDelegates(audioset: AudiosetData) {
    if (isAudiosetPlay(audioset)) {
      this.audioset = audioset;
      this.control = new AudiosetControl(audioset, this.controlListener);
      this.resources = new ResourceLoader(audioset, this.resourceListener);
      this.sampler = new Sampler(audioset, this.resources, this.audio);
    } else {
      this.control = this.noControl;
      this.sampler = this.noSampler;
      this.resources = this.noResources;
    }
  }
}

function isAudiosetPlay(audioset: AudiosetData): audioset is Audioset {
  return audioset.type === "audioset";
}