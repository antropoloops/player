import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Audioset } from "../../audioset";
import { addResizeObserver } from "../../lib/add-resize-observer";
import { Visuals } from "../../visuals";
import { State4 } from "../../player4";

type Props = {
  audioset: Audioset;
  state: State4;
};
const SimpleMapVisuals: React.FC<Props> = ({ audioset, state }) => {
  // Make visuals render after reference is set: https://dev.to/thekashey/the-same-useref-but-it-will-callback-8bo
  const [el, setReference] = useState<HTMLDivElement | null>(null);
  const visualsRef = useCallback((newRef: HTMLDivElement) => {
    setReference(newRef);
  }, []);

  const visuals = useMemo(() => createVisuals(audioset, el), [audioset, el]);
  useEffect(() => {
    if (!visuals) return;
    for (const effect of state.effects) {
      if (effect.type === "clip:play") {
        if (effect.play) visuals.show(effect.clipId);
        else visuals.hide(effect.clipId);
      }
    }
  }, [state, visuals]);

  useEffect(() => {
    if (!el) return;
    return addResizeObserver(el, (width, height) => {
      if (visuals) visuals.resize();
    });
  }, [visuals, el]);

  // visuals-display required: see index.css
  return <div ref={visualsRef} className="visuals-display w-full h-full"></div>;
};
export default SimpleMapVisuals;

const createVisuals = (audioset: Audioset, el: HTMLDivElement | null) => {
  if (!el || audioset.visuals.mode !== "map") return;

  const visuals = new Visuals(audioset, el);
  const mapUrl = audioset.visuals.geomap.url;
  fetch(mapUrl)
    .then((response) => response.json())
    .then((data: object) => {
      visuals.setGeodata(data);
      visuals.setup();
    });

  return visuals;
};
