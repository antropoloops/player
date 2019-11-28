import React from "react";
import { Audioset, Track as TrackModel } from "../../audioset";
import { player } from "../../player";
import { ControlState } from "../../player/Control";
import { Clip } from "./Clip";
import "./Track.css";

interface TrackProps {
  audioset: Audioset;
  track: TrackModel;
  state: ControlState;
}

export function Track({ audioset, track, state }: TrackProps): JSX.Element {
  return (
    <div key={track.id} className="Track">
      <div className="background" style={{ backgroundColor: track.color }} />
      <TrackHeader track={track} />
      <div className="clips">
        {track.clipIds.map((clipId, index) => (
          <Clip
            key={clipId}
            clip={audioset.index.clipById[clipId]}
            isActive={state.clips[clipId].status === "playing"}
            onClick={() => player.control.toggleClip(clipId, 0)}
          />
        ))}
      </div>
    </div>
  );
}

interface TrackHeaderProps {
  track: TrackModel;
}

const TrackHeader = ({ track }: TrackHeaderProps) => (
  <div className="TrackHeader">
    <span className="title">{track.name}</span>
  </div>
);
