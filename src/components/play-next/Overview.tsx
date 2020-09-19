import React from "react";
import { Track, Clip } from "../../audioset";
import { ArrowRight } from "../Icons";
import TrackClip from "./TrackClip";

type OverviewProps = {
  tracks: Track[];
  clipsByTrack: Record<string, Clip[]>;
  onTrack: (track: Track) => void;
  onClip: (clip: Clip, track: Track) => void;
};

const Overview: React.FC<OverviewProps> = ({
  tracks,
  clipsByTrack,
  onTrack,
  onClip,
}) => (
  <>
    {tracks.map((track) => (
      <div key={track.id} className="relative">
        <div
          className="absolute inset-x-0 inset-y-0 z-0 opacity-75"
          style={{ backgroundColor: track.color }}
        />
        <button
          className="w-full flex p-2 z-10 relative"
          onClick={() => onTrack(track)}
        >
          <div className="flex-grow text-left">{track.name}</div>
          <ArrowRight />
        </button>
        <div className="relative">
          {clipsByTrack[track.id].map((clip) => (
            <TrackClip
              key={clip.id}
              track={track}
              clip={clip}
              onClick={() => onClip(clip, track)}
            />
          ))}
        </div>
      </div>
    ))}
  </>
);

export default Overview;
