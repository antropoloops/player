import React from "react";
import { Audioset, Track } from "../../audioset";
import { PlayerState, StoppedStatus } from "../../player";
import { KeyboardController } from "../../player/KeyboardController";
import Clip from "./SimpleClip";

type Props = {
  audioset: Audioset;
  track: Track;
  state: PlayerState;
  keyboard: KeyboardController;
  onClipClicked: (clipId: string) => void;
  isStream: boolean;
};
const ClipList: React.FC<Props> = ({
  audioset,
  track,
  state,
  keyboard,
  onClipClicked,
  isStream,
}) => {
  return (
    <div className="bg-gray-medium bg-opacity-50">
      {track.clipIds.map((clipId) => (
        <Clip
          className="mb-micro last:mb-0"
          keyboard={keyboard}
          key={clipId}
          status={state.clips[clipId] || StoppedStatus}
          clip={audioset.index.clipById[clipId]}
          onClick={() => onClipClicked(clipId)}
          isStream={isStream}
        />
      ))}
    </div>
  );
};
export default ClipList;
