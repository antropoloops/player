import { Bundle } from "./Bundle";
import { LoadStatus } from "./LoadStatus";

export type BundleLoadStatus = LoadStatus<Bundle, string>;

export type FetchAudioset = (id: string) => Promise<Bundle>;

type LoadListener = (status: BundleLoadStatus) => void;

export class BundleLoader {
  public status: BundleLoadStatus = { stage: "pending" };

  constructor(private onAudiosetStatusChange: LoadListener) {}

  public fetch: FetchAudioset = () => Promise.reject();

  public loadBundle(audiosetId: string): Promise<BundleLoadStatus> {
    this.setStatus({ stage: "loading", payload: audiosetId });
    return this.fetch(audiosetId)
      .then(audioset => this.setStatus({ stage: "ready", payload: audioset }))
      .catch(error => this.setStatus({ stage: "error", error }));
  }

  private setStatus(status: BundleLoadStatus) {
    this.status = status;
    this.onAudiosetStatusChange(status);
    return status;
  }
}
