import React from "react";
import { Audioset } from "../../audioset";
import { ControlState } from "../../player/Control";
import "./Controller.css";
import { Track } from "./Track";

interface ControllerProps {
  audioset: Audioset;
  state: ControlState;
}

export const Controller = ({ audioset, state }: ControllerProps) => {
  if (!audioset || !audioset.tracks) {
    return <div>Audioset not loaded</div>;
  }

  return (
    <div className="Controller">
      {audioset.tracks.map(track => (
        <Track key={track.id} track={track} audioset={audioset} state={state} />
      ))}
    </div>
  );
};
