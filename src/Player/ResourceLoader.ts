import debug from "debug";
import { Audioset, Clip } from "../Audioset";

const log = debug("atpls:resources");

// TODO: abstract the loader mechanism: { status, payload }
interface LoadPending {
  status: "pending";
}
interface LoadingResources {
  status: "loading";
  total: number;
  completed: number;
}
interface ResourcesLoaded {
  status: "ready";
  total: number;
}
interface ResourceLoadError {
  status: "error";
  error: any;
}

export type ResourceLoadStatus =
  | LoadPending
  | LoadingResources
  | ResourcesLoaded
  | ResourceLoadError;

export type FetchAudio = (url: string) => Promise<any>;

export class ResourceLoader {
  public status: ResourceLoadStatus;
  private total: number;
  private completed: number;
  private buffers: Record<string, any> = {};

  constructor(
    private audioset: Audioset,
    private listener: (status: ResourceLoadStatus) => void,
  ) {
    this.status = { status: "pending" };
    this.total = this.audioset.clips.length;
    this.completed = 0;
  }
  public fetch: FetchAudio = () => Promise.reject();

  public getBuffer(clipId: string): any {
    return this.buffers[clipId];
  }

  public load() {
    const { total, completed } = this;
    if (total === completed) {
      return;
    }

    this._setStatus({ status: "loading", total, completed: 0 });
    const clips = this.audioset.clips;
    const promises = clips.map(clip =>
      this._loadAudio(clip).catch(err => {
        this._complete();
        log("Error %o", err);
      }),
    );
    return Promise.all(promises);
  }

  //// PRIVATE ////
  private _setStatus(status: ResourceLoadStatus) {
    this.status = status;
    this.listener(status);
  }

  private async _loadAudio(clip: Clip) {
    // TODO: check other formats
    const url = clip.resources.audio.mp3;
    const buffer = await this.fetch(url);
    this.buffers[clip.id] = buffer;
    this._complete();

    return buffer;
  }

  private _complete() {
    this.completed += 1;
    const status: ResourceLoadStatus =
      this.completed === this.total
        ? { status: "ready", total: this.total }
        : { status: "loading", total: this.total, completed: this.completed };
    this._setStatus(status);
  }
}
