import React, { useEffect, useState } from "react";
import { Audioset } from "../../audioset";
import { player } from "../../player";
import { ControlState } from "../../player/Control";
import "./Controller.css";
import { Track } from "./Track";

interface ControllerProps {
  audioset: Audioset;
}

export const Controller = ({ audioset }: ControllerProps) => {
  const state = useControlState();

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

function useControlState(): ControlState {
  const [state, setState] = useState(player.control.getState());

  useEffect(() =>
    player.onControlStateChanged(controlState => {
      setState(controlState);
    }),
  );
  return state;
}
