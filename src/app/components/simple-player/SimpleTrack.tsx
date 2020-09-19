import classcat from "classcat";
import React from "react";
import { Audioset, Track } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { PlayerState, StoppedStatus } from "../../simplePlayer";
import { ReactComponent as StopIcon } from "../icons/stop-24px.svg";
import Clip from "./SimpleClip";

type Props = {
  audioset: Audioset;
  keyboard: KeyboardController;
  track: Track;
  state: PlayerState;
  onClipClick: (clipId: string) => void;
  onStopTrack: () => void;
};
const SimpleTrack: React.FC<Props> = ({
  audioset,
  track,
  state,
  onClipClick,
  onStopTrack,
  keyboard,
}) => {
  const isPoly = audioset.audio.mode === "1"; // FIXME: change to a name
  const isTrackPlaying = state.tracks[track.id]?.playing;
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
        <h3 className="text-white-light flex-grow">{track.name}</h3>
        {isTrackPlaying && (
          <button
            className="flex-shrink-0 rounded-full bg-gray-light bg-opacity-0 hover:bg-opacity-25"
            onClick={onStopTrack}
          >
            <StopIcon className="fill-current text-gray-light" />
          </button>
        )}
      </div>

      <div className="bg-gray-medium bg-opacity-50">
        {track.clipIds.map((clipId) => (
          <Clip
            className="mb-micro last:mb-0"
            keyboard={keyboard}
            key={clipId}
            status={state.clips[clipId] || StoppedStatus}
            clip={audioset.index.clipById[clipId]}
            onClick={() => onClipClick(clipId)}
            isStream={!isPoly}
          />
        ))}
      </div>
    </div>
  );
};
export default SimpleTrack;
