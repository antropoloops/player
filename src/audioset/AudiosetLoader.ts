import { AudiosetData } from ".";

// TODO: abstract (LoadPending, LoadProgress, LoadReady, LoadError)
interface LoadPending {
  readonly status: "pending";
}
interface LoadingAudioset {
  readonly status: "loading";
  readonly audiosetId: string;
}
interface AudiosetLoaded {
  readonly status: "ready";
  readonly audioset: AudiosetData;
}
interface AudiosetLoadError {
  readonly status: "error";
  readonly error: any;
}

export type AudiosetLoadStatus =
  | LoadPending
  | LoadingAudioset
  | AudiosetLoaded
  | AudiosetLoadError;

export type FetchAudioset = (id: string) => Promise<AudiosetData>;

type LoadListener = (status: AudiosetLoadStatus) => void;

export class AudiosetLoader {
  public status: AudiosetLoadStatus = { status: "pending" };

  constructor(private onAudiosetStatusChange: LoadListener) {}
  public fetch: FetchAudioset = () => Promise.reject();

  public loadAudioset(audiosetId: string): Promise<AudiosetLoadStatus> {
    this.setStatus({ status: "loading", audiosetId });
    return this.fetch(audiosetId)
      .then(audioset => this.setStatus({ status: "ready", audioset }))
      .catch(error => this.setStatus({ status: "error", error }));
  }

  private setStatus(status: AudiosetLoadStatus) {
    this.status = status;
    this.onAudiosetStatusChange(status);
    return status;
  }
}
