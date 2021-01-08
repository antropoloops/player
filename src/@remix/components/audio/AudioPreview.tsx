import React from "react";
import { StoredFile } from "../../../models";
import useAudioFile from "../../hooks/useAudioFile";
import { Waveform } from "../../../@sounds/components/Waveform";
import { formatDuration } from "../../../@sounds/helpers/timeHelpers";
import { PlayButton } from "../../../@sounds/components/PlayButton";
import { usePlayBuffer } from "../../hooks/usePlayBuffer";

type Props = {
  className?: string;
  file?: StoredFile;
  color: string;
};

export default function SoundPreview({ className, file, color }: Props) {
  const thumbnail = file?.thumbnail || "";

  const { buffer, load } = useAudioFile(file);

  const [play, { playing }] = usePlayBuffer(buffer, {
    offset: 0,
    duration: buffer?.duration || 0,
  });

  return (
    <div className={className}>
      {file && (
        <label htmlFor="Nombre del sonido" className="text-sm lg:text-base">
          {file.fileName} {formatDuration(file.duration)}
        </label>
      )}
      <div className="flex items-center">
        {file && (
          <PlayButton
            className="border-2 rounded-full mr-4"
            style={{ borderColor: color, color }}
            onClick={() => {
              if (playing) {
                play(false);
              } else if (buffer) {
                play(true);
              } else {
                load().then(() => {
                  play(true);
                });
              }
            }}
            playing={playing}
          />
        )}
        <div className="flex-grow mt-1 p-1 bg-gray-darker text-remixes opacity-75">
          <Waveform
            width={100}
            height={10}
            points={thumbnail}
            style={{ color }}
          />
        </div>
      </div>
    </div>
  );
}