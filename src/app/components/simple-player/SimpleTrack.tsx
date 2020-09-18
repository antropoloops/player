import React from "react";
import { Audioset, Track } from "../../../audioset";
import { KeyboardController } from "../../../player/Control";
import { PlayerState, StoppedStatus } from "../../simplePlayer";
import Clip from "./SimpleClip";

type Props = {
  audioset: Audioset;
  keyboard: KeyboardController;
  track: Track;
  state: PlayerState;
  onClipClick: (clipId: string) => void;
};
const SimpleTrack: React.FC<Props> = ({
  audioset,
  track,
  state,
  onClipClick,
  keyboard,
}) => {
  const isPoly = audioset.audio.mode === "1"; // FIXME: change to a name
  return (
    <div
      data-cy={`Track-${track.id}`}
      key={track.id}
      className="text-white-light font-medium"
      style={{ backgroundColor: track.color }}
    >
      <div className="flex p-2 bg-gray-dark bg-opacity-50">
        <h3 className="text-white-light">{track.name}</h3>
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
