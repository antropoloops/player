import { Audioset } from "../../audioset";
import { Visuals } from "../../visuals";
import { ControlCommand } from "../Control";
import { Effects } from "../Control/Effects";
import { addResizeObserver } from "./addResizeObserver";

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
function setupVisuals(audioset: Audioset, visuals: Visuals): Promise<Visuals> {
  if (audioset.visuals.mode === "map") {
    // TODO: remove it when found a solution for mobile / desktop
    let url = audioset.visuals.geomap.url;
    if (url === "https://unpkg.com/world-atlas@1.1.4/world/50m.json") {
      url = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json";
    }

    return fetch(url)
      .then(response => response.json())
      .then(data => visuals.setGeodata(data))
      .then(() => visuals);
  } else {
    visuals.setup();
    return Promise.resolve(visuals);
  }
}
