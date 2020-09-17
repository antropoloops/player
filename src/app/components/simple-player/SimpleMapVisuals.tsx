import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Audioset } from "../../../audioset";
import { Visuals } from "../../../visuals";
import { PlayerState } from "../../simplePlayer/types";

type Props = {
  audioset: Audioset;
  state: PlayerState;
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
    const { clips, lastTickAt } = state;
    for (const [clipId, clip] of Object.entries(clips)) {
      if (clip.time === lastTickAt && !clip.dirty) {
        if (clip.playing) visuals.show(clipId);
        else visuals.hide(clipId);
      }
    }
  }, [state, visuals]);

  return <div ref={visualsRef} className="w-full h-full"></div>;
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
