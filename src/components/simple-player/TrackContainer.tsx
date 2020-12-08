import classcat from "classcat";
import React from "react";
import { Track } from "../../audioset";
import { TrackStatus4 } from "../../player4";
import { ReactComponent as StopIcon } from "../icons/stop-24px.svg";

type Props = {
  track: Track;
  status: TrackStatus4;
  onStopTrack: () => void;
  onClick?: () => void;
};
const SimpleTrack: React.FC<Props> = ({
  track,
  status,
  onStopTrack,
  children,
  onClick,
}) => {
  const isTrackPlaying = status?.playing;
  return (
    <div
      data-cy={`Track-${track.id}`}
      key={track.id}
      className="text-white-light font-medium"
      style={{ backgroundColor: track.color }}
    >
      <div
        className={classcat([
          "flex py-2 px-1 bg-gray-dark bg-opacity-50",
          isTrackPlaying ? "animate-pulse" : "",
        ])}
      >
        <button
          disabled={!onClick}
          onClick={onClick}
          className="text-left text-white-light flex-grow"
        >
          {track.name}
        </button>
        {isTrackPlaying && (
          <button
            className="flex-shrink-0 rounded-full bg-gray-light bg-opacity-0 hover:bg-opacity-25"
            onClick={onStopTrack}
          >
            <StopIcon className="fill-current text-gray-light" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
export default SimpleTrack;
