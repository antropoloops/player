import debug from "debug";
import { Audioset, Clip } from "../audioset";
import { decodeAudioBuffer } from "./decodeAudioBuffer";

const log = debug("atpls:resources");

// TODO: abstract the loader mechanism: { stage, payload }
export interface LoadPending {
  stage: "pending";
}
export interface LoadingResources {
  stage: "loading";
  total: number;
  completed: number;
}
export interface ResourcesLoaded {
  stage: "ready";
  total: number;
}
export interface ResourceLoadError {
  stage: "error";
  error: any;
}

export type ResourceLoadStatus =
  | LoadPending
  | LoadingResources
  | ResourcesLoaded
  | ResourceLoadError;

export class ResourceLoader {
  public status: ResourceLoadStatus;
  private preloadImage: (url: string) => void;
  private total: number;
  private completed: number;
  private buffers: Record<string, any> = {};

  constructor(
    private audioset: Audioset,
    private listener: (status: ResourceLoadStatus) => void,
  ) {
    log("create ResourceLoader %s", audioset.id);
    this.status = { stage: "pending" };
    this.total = this.audioset.clips.length;
    this.completed = 0;
    this.preloadImage = preloadImage;
  }

  public getBuffer(clipId: string): any {
    return this.buffers[clipId];
  }

  public preload() {
    log("Preload");
    const { visuals, clips } = this.audioset;
    if (visuals.mode === "map" && visuals.geomap.url) {
      fetch(visuals.geomap.url);
    }
    clips.forEach(clip => {
      this.preloadImage(clip.resources.cover.small);
    });
  }

  public load() {
    const { total, completed } = this;
    if (total === completed) {
      return;
    }

    this.setStatus({ stage: "loading", total, completed: 0 });
    const clips = this.audioset.clips;
    const promises = clips.map(clip =>
      this.loadAudio(clip).catch(err => {
        this.handleResourceCompleted();
        log("Error %o", err);
      }),
    );
    return Promise.all(promises);
  }

  //// PRIVATE ////
  private setStatus(status: ResourceLoadStatus) {
    this.status = status;
    this.listener(status);
  }

  private async loadAudio(clip: Clip) {
    // TODO: check other formats
    const url = clip.resources.audio.mp3;
    const response = await fetch(url);
    const buffer = await decodeAudioBuffer(response);
    this.buffers[clip.id] = buffer;
    this.handleResourceCompleted(url);

    return buffer;
  }

  private handleResourceCompleted(url?: string) {
    this.completed += 1;
    const status: ResourceLoadStatus =
      this.completed >= this.total
        ? { stage: "ready", total: this.total }
        : { stage: "loading", total: this.total, completed: this.completed };
    this.setStatus(status);
  }
}

function preloadImage(url: string) {
  if (url && url.length) {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.src = url;
    });
  }
}
