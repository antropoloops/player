import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Audioset } from "../../../audioset";
import { addResizeObserver } from "../../../lib/add-resize-observer";
import { Visuals } from "../../../visuals";
import { PlayerState } from "../../simplePlayer";

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
    const { commands, lastCommand } = state;
    for (let i = lastCommand; i < commands.length; i++) {
      const command = commands[i];
      if (command.type === "clip:start") {
        visuals.show(command.clipId);
      } else if (command.type === "clip:stop") {
        visuals.hide(command.clipId);
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
