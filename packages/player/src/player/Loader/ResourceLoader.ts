import debug from "debug";
import { IAudioContext } from "standardized-audio-context";
import { Audioset, Clip } from "@atpls/audioset";
import getSupportedAudioCodecs from "@atpls/test-audio-codecs";
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

export interface Resources {
  getStatus(): ResourceLoadStatus;
  getBuffer(clipId: string): any;
  load(ctx: IAudioContext): Promise<any>;
}

export class ResourceLoader implements Resources {
  public status: ResourceLoadStatus;
  private total: number;
  private completed: number;
  private buffers: Record<string, any> = {};
  private preloaded: boolean;
  private readonly format: "mp3" | "ogg" | "wav";

  constructor(
    private audioset: Audioset,
    private listener: (status: ResourceLoadStatus) => void
  ) {
    log("create ResourceLoader %s", audioset.id);
    const codecs = getSupportedAudioCodecs();
    this.format = codecs.ogg ? "ogg" : codecs.mp3 ? "mp3" : "wav";
    log("Preferred audio format %s", this.format);
    this.status = { stage: "pending" };
    this.preloaded = false;
    this.total = this.audioset.clips.length;
    this.completed = 0;
    setTimeout(() => {
      this.preload();
    }, 2000);
  }

  public getStatus() {
    return this.status;
  }

  public getBuffer(clipId: string): any {
    return this.buffers[clipId];
  }

  public load(context: IAudioContext) {
    this.preload();
    const { total, completed } = this;
    if (total === completed) {
      return Promise.resolve();
    }

    log("Start clip audio loading [%s]", this.audioset.meta.title);
    this.setStatus({ stage: "loading", total, completed: 0 });
    const clips = this.audioset.clips;
    if (clips[0]) {
      log("Audio format %s", clips[0].resources.audio.ogg ? "ogg" : "mp3");
    }
    const promises = clips.map((clip) =>
      this.loadClipAudio(clip, context).catch((err) => {
        this.handleResourceCompleted();
        log("Error %o", err);
      })
    );
    return Promise.all(promises);
  }

  private preload() {
    if (this.preloaded) {
      return Promise.resolve();
    }

    log("Preload");
    this.preloaded = true;
    const { visuals, clips } = this.audioset;
    const promises: Array<Promise<any>> = [];
    if (visuals.mode === "map" && visuals.geomap.url) {
      promises.push(fetch(visuals.geomap.url));
    }
    clips.forEach((clip) => {
      preloadImage(clip.resources.cover.small);
    });
    const loadAll = () => {
      log("Preload images");
      return Promise.all(promises);
    };

    return preloadImage(this.audioset.meta.logo_url)
      .then(loadAll)
      .catch(loadAll);
  }

  //// PRIVATE ////
  private setStatus(status: ResourceLoadStatus) {
    if (status.stage !== "loading") {
      log("stage %s", status.stage);
    }
    this.status = status;
    this.listener(status);
  }

  private async loadClipAudio(clip: Clip, context: IAudioContext) {
    const { audio } = clip.resources;
    const url = audio[this.format] || "";
    if (url === "") {
      log("Valid audio format not found", clip, this.format);
    }
    const response = await fetch(url);
    const buffer = await decodeAudioBuffer(response, context);
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

function preloadImage(url: string): Promise<any> {
  if (!url || !url.length) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
