import { AudiosetBundle } from "./AudiosetBundle";
import { LoadStatus } from "./LoadStatus";

export type AudiosetLoadStatus = LoadStatus<AudiosetBundle, string>;

export type FetchAudioset = (id: string) => Promise<AudiosetBundle>;

type LoadListener = (status: AudiosetLoadStatus) => void;

export class AudiosetLoader {
  public status: AudiosetLoadStatus = { stage: "pending" };

  constructor(private onAudiosetStatusChange: LoadListener) {}
  public fetch: FetchAudioset = () => Promise.reject();

  public loadAudioset(audiosetId: string): Promise<AudiosetLoadStatus> {
    this.setStatus({ stage: "loading", payload: audiosetId });
    return this.fetch(audiosetId)
      .then(audioset => this.setStatus({ stage: "ready", payload: audioset }))
      .catch(error => this.setStatus({ stage: "error", error }));
  }

  private setStatus(status: AudiosetLoadStatus) {
    this.status = status;
    this.onAudiosetStatusChange(status);
    return status;
  }
}
