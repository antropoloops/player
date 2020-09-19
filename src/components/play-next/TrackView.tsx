import React from "react";
import { Track, Clip } from "../../audioset";
import TrackClip from "./TrackClip";

type Props = {
  track: Track;
  clips: Clip[];
  active?: Clip;
  onClick: (clip: Clip, track: Track) => void;
};

const TrackView: React.FC<Props> = ({ track, clips, active, onClick }) => {
  return (
    <div className="">
      {active && (
        <img
          className="w-1/2"
          src={active.resources.cover.thumb}
          alt={active.name}
        />
      )}

      <div className="m-4">
        <label>Volumen</label>
        <input type="range" min="0" max="100" className="w-full" />
        <label>Efectos</label>
        <input type="range" min="0" max="100" className="w-full" />
      </div>

      {clips.map((clip) => (
        <TrackClip
          key={clip.id}
          track={track}
          clip={clip}
          onClick={() => onClick(clip, track)}
        />
      ))}
    </div>
  );
};
export default TrackView;
