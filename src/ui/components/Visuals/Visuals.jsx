import React from "react";
import { useEffect, useRef } from "react";
import createVisuals from "../../../lib/visuals";
import "./Visuals.css";

const Visuals = ({ audioset, sync }) => {
  const visualsRef = useRef();
  useEffect(() => {
    if (audioset && visualsRef.current) {
      sync.addEffect(() => {
        return createVisuals(audioset, visualsRef.current);
      });
    }
  }, [audioset, sync]);
  return <div className="Visuals" ref={visualsRef} />;
};

export default Visuals;
