import { AudiosetBundle } from ".";

// TODO: abstract (LoadPending, LoadProgress, LoadReady, LoadError)
interface LoadPending {
  readonly stage: "pending";
}
interface LoadingAudioset {
  readonly stage: "loading";
  readonly audiosetId: string;
}
interface AudiosetLoaded {
  readonly stage: "ready";
  readonly audioset: AudiosetBundle;
}
interface AudiosetLoadError {
  readonly stage: "error";
  readonly error: any;
}

export type AudiosetLoadStatus =
  | LoadPending
  | LoadingAudioset
  | AudiosetLoaded
  | AudiosetLoadError;

export type FetchAudioset = (id: string) => Promise<AudiosetBundle>;

type LoadListener = (status: AudiosetLoadStatus) => void;

export class AudiosetLoader {
  public status: AudiosetLoadStatus = { stage: "pending" };

  constructor(private onAudiosetStatusChange: LoadListener) {}
  public fetch: FetchAudioset = () => Promise.reject();

  public loadAudioset(audiosetId: string): Promise<AudiosetLoadStatus> {
    this.setStatus({ stage: "loading", audiosetId });
    return this.fetch(audiosetId)
      .then(audioset => this.setStatus({ stage: "ready", audioset }))
      .catch(error => this.setStatus({ stage: "error", error }));
  }

  private setStatus(status: AudiosetLoadStatus) {
    this.status = status;
    this.onAudiosetStatusChange(status);
    return status;
  }
}
