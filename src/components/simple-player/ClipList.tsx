import React from "react";
import { Audioset, Track } from "../../audioset";
import { KeyboardController } from "../../player/KeyboardController";
import { Status4 } from "../../player4";
import Clip from "./SimpleClip";

type Props = {
  audioset: Audioset;
  track: Track;
  status: Status4;
  keyboard: KeyboardController;
  onClipClicked: (clipId: string) => void;
  isStream: boolean;
};
const ClipList: React.FC<Props> = ({
  audioset,
  track,
  status,
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
          status={status.clips[clipId] || { playing: false, time: 0 }}
          clip={audioset.index.clipById[clipId]}
          onClick={() => onClipClicked(clipId)}
          isStream={isStream}
        />
      ))}
    </div>
  );
};
export default ClipList;
