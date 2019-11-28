import {
  Audioset,
  AudiosetBundle,
  EmptyAudioset,
  isAudioset,
} from "../audioset";
import { AudiosetLoader, AudiosetLoadStatus } from "../audioset/AudiosetLoader";
import { AudioEngine, DebugAudioEngine } from "./Audio";
import {
  AudiosetControl,
  ControlCommand,
  ControlListener,
  ControlState,
} from "./AudiosetControl";
import { Emitter, Listener, Unsubscribe } from "./Emitter";
import {
  ResourceLoader,
  ResourceLoadStatus,
  Resources,
} from "./ResourceLoader";
import { Sampler } from "./Sampler";

const NoOp = (param: any) => undefined;
const NoControl = new AudiosetControl(EmptyAudioset, {
  onControlCommand: NoOp,
  onControlStateChanged: NoOp,
});
const NoResources = new ResourceLoader(EmptyAudioset, NoOp);
const NoEngine = new DebugAudioEngine();
const NoSampler = new Sampler(EmptyAudioset, NoResources, NoEngine);

const NoPlayer = {
  control: NoControl,
  resources: NoResources,
  sampler: NoSampler,
};

/**
 * A player is the facade for the rest of the components:
 * - Loader: load audioset and resources
 * - Control: determines how to play clips
 * - Pads: receive pad events
 * - Params: receive param change events
 * - Keyboard: receive keyboard events
 * - Sampler: play the audio
 */
export interface Player {
  readonly loader: AudiosetLoader;
  readonly resources: Resources;
  readonly control: AudiosetControl;
  setAudioEngine(audio: AudioEngine): void;
  onControlStateChanged(listener: Listener<ControlState>): Unsubscribe;
  onResourceStatusChanged(listener: Listener<ResourceLoadStatus>): Unsubscribe;
  onCommand(listener: Listener<ControlCommand>): Unsubscribe;
}

class AudiosetPlayer {
  public resources: Resources = NoResources;
  private audioset: Audioset = EmptyAudioset;
  private readonly resourceListener: (status: ResourceLoadStatus) => void;
  private readonly resourceStatusChanged = new Emitter<ResourceLoadStatus>();

  public constructor() {
    this.resourceListener = (status: ResourceLoadStatus) => {
      this.handleResourceChanged(status);
    };
  }

  public getAudioset() {
    return this.audioset;
  }

  public onResourceStatusChanged(listener: Listener<ResourceLoadStatus>) {
    return this.resourceStatusChanged.on(listener);
  }

  // PRIVATE //

  protected setAudioset(audioset: Audioset) {
    this.audioset = audioset;
    this.resources = new ResourceLoader(audioset, this.resourceListener);
  }

  private handleResourceChanged(status: ResourceLoadStatus) {
    this.resourceStatusChanged.emit(status);
  }
}

export class ControlPlayer extends AudiosetPlayer {
  public control: AudiosetControl = NoControl;
  protected readonly controlListener: ControlListener;

  private readonly stateEvent = new Emitter<ControlState>();
  private readonly controlCommandEvent = new Emitter<ControlCommand>();

  constructor() {
    super();
    this.controlListener = {
      onControlStateChanged: state => this.handleControlStateChanged(state),
      onControlCommand: command => this.handleControlCommand(command),
    };
  }

  /**
   * @override
   */
  public setAudioset(audioset: Audioset) {
    this.control = new AudiosetControl(audioset, this.controlListener);
    super.setAudioset(audioset);
  }

  public onControlStateChanged(listener: Listener<ControlState>) {
    return this.stateEvent.on(listener);
  }

  public onCommand(listener: Listener<ControlCommand>) {
    return this.controlCommandEvent.on(listener);
  }

  protected handleControlCommand(command: ControlCommand) {
    this.controlCommandEvent.emit(command);
  }

  private handleControlStateChanged(controlState: ControlState) {
    this.stateEvent.emit(controlState);
  }
}

class AudioPlayer extends ControlPlayer {
  protected audio: AudioEngine = new DebugAudioEngine();
  private sampler: Sampler = NoSampler;

  constructor() {
    super();
    this.sampler = NoSampler;
  }

  /**
   * @override
   */
  public setAudioset(audioset: Audioset) {
    this.sampler = new Sampler(audioset, this.resources, this.audio);
    super.setAudioset(audioset);
  }

  public setAudioEngine(audio: AudioEngine) {
    this.audio = audio;
    // this.sampler.dispose()
    this.sampler = new Sampler(this.getAudioset(), this.resources, this.audio);
  }
  protected handleControlCommand(command: ControlCommand) {
    this.sampler.run(command);
    super.handleControlCommand(command);
  }
}

/**
 * A player with a audioset loader.
 * The idea is a player with state, but not well modelled
 */
export class PlayerState extends AudioPlayer implements Player {
  public readonly loader: AudiosetLoader;
  private readonly audiosetLoadStatusChanged = new Emitter<
    AudiosetLoadStatus
  >();

  constructor() {
    super();
    this.loader = new AudiosetLoader(status =>
      this.handleLoadStatusChanged(status),
    );
  }

  private handleLoadStatusChanged(status: AudiosetLoadStatus) {
    this.audiosetLoadStatusChanged.emit(status);
    if (status.stage === "ready") {
      this.setAudiosetBundle(status.payload);
    }
  }

  private setAudiosetBundle(bundle: AudiosetBundle) {
    this.control.stopAll(0);
    if (isAudioset(bundle)) {
      this.setAudioset(bundle);
    } else {
      Object.assign(this, NoPlayer);
    }
  }
}
