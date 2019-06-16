import { debounce } from "lodash";
import Visuals from "./visuals";
import Display from "./display";

export default function createVisuals(audioset, el) {
  const display = new Display(el);
  const visuals = new Visuals(audioset, display);

  const mode = audioset.visuals.mode;

  if (mode === "map") {
    fetch(audioset.visuals.geomap.url)
      .then(response => response.json())
      .then(data => visuals.setGeodata(data));
  } else if (mode === "panel") {
    visuals.setup();
  }

  window.addEventListener(
    "resize",
    debounce(() => {
      visuals.resizeSvg(el);
    })
  );

  return {
    start: clipId => visuals.show(clipId),
    stop: clipId => visuals.hide(clipId)
  };
}
