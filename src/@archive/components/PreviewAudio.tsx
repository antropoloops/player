import React from "react";
import { PauseIcon, PlayIcon } from "../../components/icons/Icons";
import IconButton from "../../components/shared/IconButton";
import useAudioBuffer from "../hooks/useAudioBuffer";
import { useOfflineMediaFileQuery } from "../hooks/useOfflineMediaQueries";
import { usePlayBuffer } from "../hooks/usePlayBuffer";
import { Waveform } from "./Waveform";
import { formatTime } from "../../@archive/helpers/timeHelpers";

type Props = {
  storage?: {
    offlineId: string;
    fileName?: string;
    waveform?: string;
  };
  buffer?: AudioBuffer;
  noAudioLoad?: boolean;
  color?: string;
};

const PreviewAudio: React.FC<Props> = ({
  storage,
  color,
  buffer,
  noAudioLoad,
}) => {
  const { data: file } = useOfflineMediaFileQuery(
    noAudioLoad || buffer ? undefined : storage?.offlineId
  );
  const { buffer: blobBuffer } = useAudioBuffer(
    noAudioLoad || buffer ? undefined : file?.data.blob
  );

  const audioBuffer = buffer || blobBuffer;
  const offset = 0;
  const duration = audioBuffer?.duration || 0;

  const [play, { playing }] = usePlayBuffer(audioBuffer, { offset, duration });

  if (!storage) return null;

  return (
    <div className="">
      <label className="text-xs">
        {formatTime(duration)} {storage.fileName || ""}
      </label>
      <div
        className="w-full bg-gray-darker rounded-sm"
        style={color ? { color } : {}}
      >
        <Waveform width={1000} height={100} points={storage.waveform || ""} />
      </div>
      <div className="flex py-2">
        <IconButton
          icon={playing ? PauseIcon : PlayIcon}
          onClick={() => {
            play(!playing);
          }}
        >
          {playing ? "Parar" : "Escuchar"}
        </IconButton>
      </div>
    </div>
  );
};

export default PreviewAudio;
