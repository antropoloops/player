import debug from "debug";
import { addResizeObserver } from "../add-resize-observer";
import { Audioset } from "../audioset";
import { Visuals } from "../visuals";
import { ControlCommand } from "./Control";
import { Effects } from "./Control";

const log = debug("atpls:visuals");

export function createVisualEffects(audioset: Audioset): Effects {
  return new VisualEffects(audioset);
}

class VisualEffects implements Effects {
  private visuals?: Visuals;
  constructor(readonly audioset: Audioset) {}

  public attach(el: any): void {
    this.detach();
    this.visuals = new Visuals(this.audioset, el);
    setupVisuals(this.audioset, this.visuals);
    const resize = (width: number, height: number) => {
      if (this.visuals) {
        this.visuals.resizeSvg(width, height);
      }
    };
    this.detach = addResizeObserver(el, resize);
  }
  public detach(): void {
    // Attach replaces this method
  }
  public run(command: ControlCommand): void {
    if (this.visuals) {
      switch (command.command) {
        case "startClip":
          return this.visuals.show(command.clipId);
        case "stopClip":
          return this.visuals.hide(command.clipId);
      }
    }
  }
}

// TODO: this should be part of resource loader
function setupVisuals(audioset: Audioset, visuals: Visuals): Promise<Visuals> {
  if (audioset.visuals.mode === "map") {
    // TODO: remove it when found a solution for mobile / desktop
    return fetchGeomap(audioset.visuals.geomap.url)
      .then((data: object) => visuals.setGeodata(data))
      .then(() => visuals);
  } else {
    visuals.setup();
    return Promise.resolve(visuals);
  }
}

function fetchGeomap(url: string): Promise<object> {
  log("Geomap url %s", url);

  return fetch(url).then(response => response.json());
}
