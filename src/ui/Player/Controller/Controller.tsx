import React from "react";
import { Audioset } from "../../../audioset";
import { ControlState, PlayerControl } from "../../../player/Control";
import { Track } from "./Track";
interface ControllerProps {
  audioset: Audioset;
  state: ControlState;
  control?: PlayerControl;
}
export const Controller = ({ audioset, state, control }: ControllerProps) => {
  if (!audioset || !audioset.tracks) {
    return <div>Audioset not loaded</div>;
  }
  return (
    <div className={`Controller ${!control && "loading"}`}>
      {audioset.tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          audioset={audioset}
          control={control}
          state={state}
        />
      ))}
    </div>
  );
};
