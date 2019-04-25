import Visuals from "./visuals";
import Display from "./display";

export default function createVisuals(audioset, el) {
  const display = new Display(el);
  const visuals = new Visuals(audioset, display);
  visuals.render();
  fetch(audioset.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => visuals.setGeodata(data));

  return {
    start: clipId => visuals.show(clipId),
    stop: clipId => visuals.hide(clipId)
  };
}
