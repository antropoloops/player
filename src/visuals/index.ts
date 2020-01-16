import { Audioset } from "../audioset";
import { ControlCommand } from "../player/Control";
import { addResizeObserver } from "./addResizeObserver";
import Display from "./display";
import Visuals from "./visuals";

// TODO: move this outside visuals
export class VisualControl {
  private display: Display;
  private visuals: Visuals;
  private detachers: Array<() => void> = [];

  constructor(audioset: Audioset, el: any) {
    this.display = new Display(el);
    this.visuals = new Visuals(audioset, this.display);
    setupVisuals(audioset, this.visuals).then(() => {
      this.detachers.push(
        addResizeObserver(el, (width: number, height: number) => {
          this.visuals.resizeSvg(width, height);
        }),
      );
    });
  }

  public run(command: ControlCommand) {
    switch (command.command) {
      case "startClip":
        return this.startClip(command.clipId);
      case "stopClip":
        return this.stopClip(command.clipId);
    }
  }

  public startClip(clipId: string) {
    this.visuals.show(clipId);
  }

  public stopClip(clipId: string) {
    this.visuals.hide(clipId);
  }

  public detach() {
    for (const detach of this.detachers) {
      detach();
    }
  }
}

function setupVisuals(audioset: Audioset, visuals: Visuals): Promise<Visuals> {
  if (audioset.visuals.mode === "map") {
    return fetch(audioset.visuals.geomap.url)
      .then(response => response.json())
      .then(data => visuals.setGeodata(data))
      .then(() => visuals);
  } else {
    visuals.setup();
    return Promise.resolve(visuals);
  }
}
