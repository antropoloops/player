import { debounce } from "lodash";
import Visuals from "./visuals";
import Display from "./display";

export default function createVisuals(audioset, el) {
  const display = new Display(el);
  const visuals = new Visuals(audioset, display);

  fetch(audioset.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => visuals.setGeodata(data));

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
