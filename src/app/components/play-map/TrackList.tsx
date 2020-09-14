import React from "react";
import { Audioset } from "../../../audioset";
import { ControlState, PlayerControl } from "../../../player/Control";
import Track from "./Track";

type TrackListProps = {
  audioset: Audioset;
  state: ControlState;
  control?: PlayerControl;
  onResume: () => void;
};

const TrackList = ({ audioset, state, control, onResume }: TrackListProps) => {
  if (!audioset || !audioset.tracks) {
    return <div>Audioset not loaded</div>;
  }
  return (
    <div
      className={`TrackList ${!control && "loading"}`}
      onClick={control ? undefined : onResume}
    >
      {audioset.tracks.map((track) => (
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

export default TrackList;
