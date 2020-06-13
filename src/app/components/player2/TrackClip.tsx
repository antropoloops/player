import React from "react";
import { Clip, Track } from "../../../audioset";

type Props = {
  track: Track;
  clip: Clip;
  onClick: () => void;
};

const TrackClip: React.FC<Props> = ({ track, clip, onClick }) => {
  return (
    <button
      data-testid={`clip-${clip.id}`}
      className="text-left w-full flex mb-1 items-center"
      style={{ backgroundColor: track.color }}
      onClick={onClick}
    >
      <img
        className="w-1/6"
        alt={clip.title}
        src={clip.resources.cover.thumb}
      />
      <div className="ml-2 flex-grow">{clip.name}</div>
      <div className="flex-shrink-0 uppercase mr-2 w-8 h-8 text-center leading-8 rounded-full bg-gray-dark">
        {clip.keyMap}
      </div>
    </button>
  );
};
export default TrackClip;
