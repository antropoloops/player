import { debounce } from "lodash";
import { Audioset } from "../Audioset";
import Display from "./display";
import Visuals from "./visuals";

export class VisualControl {
  private display: Display;
  private visuals: Visuals;
  private handleResize: any;

  constructor(audioset: Audioset, private el: any) {
    this.display = new Display(el);
    this.visuals = new Visuals(audioset, this.display);
    setupVisuals(audioset, this.visuals);

    this.handleResize = debounce(() => {
      this.visuals.resizeSvg();
    });

    window.addEventListener(el, this.handleResize);
  }

  public startClip(clipId: string) {
    this.visuals.show(clipId);
  }

  public stopClip(clipId: string) {
    this.visuals.hide(clipId);
  }

  public detach() {
    window.removeEventListener(this.el, this.handleResize);
  }
}

function setupVisuals(audioset: Audioset, visuals: Visuals) {
  if (audioset.visuals.mode === "map") {
    fetch(audioset.visuals.geomap.url)
      .then(response => response.json())
      .then(data => visuals.setGeodata(data));
  } else {
    visuals.setup();
  }
}
