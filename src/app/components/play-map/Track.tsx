import React from "react";
import { Audioset, Track as TrackModel } from "../../../audioset";
import { ControlState, PlayerControl } from "../../../player/Control";
import { Clip } from "./Clip";
import "./Track.css";

interface TrackProps {
  audioset: Audioset;
  track: TrackModel;
  state: ControlState;
  control?: PlayerControl;
}

const Track: React.FC<TrackProps> = ({ audioset, track, state, control }) => {
  return (
    <div key={track.id} className="Track">
      <div className="background" style={{ backgroundColor: track.color }} />
      <div className="relative">
        <div className="color-white-light p-2">{track.name}</div>
      </div>
      <div className="clips">
        {track.clipIds.map((clipId, index) => (
          <Clip
            key={clipId}
            clip={audioset.index.clipById[clipId]}
            isActive={state.clips[clipId]?.status === "playing"}
            control={control}
          />
        ))}
      </div>
    </div>
  );
};

export default Track;
