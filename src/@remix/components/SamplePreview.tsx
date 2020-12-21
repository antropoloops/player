import React from "react";
import { Media, Selection, Track } from "../../models";
import useAudioFile from "../hooks/useAudioFile";
import { Waveform } from "../../@sounds/components/Waveform";
import { formatDuration } from "../../@sounds/helpers/timeHelpers";
import { PlayButton } from "../../@sounds/components/PlayButton";
import { usePlayBuffer } from "../hooks/usePlayBuffer";

type Props = {
  className?: string;
  track?: Track;
  sample: Selection;
  sound?: Media;
};

export default function SamplePreview({
  className,
  sample,
  track,
  sound,
}: Props) {
  const file = sample.file || sample.media?.file || sound?.file;
  const thumbnail = file?.thumbnail || "";

  const { buffer, load, isLoading } = useAudioFile(file);

  const [play, { playing }] = usePlayBuffer(buffer, {
    offset: 0,
    duration: buffer?.duration || 0,
  });

  const color = track?.meta.color || "white";

  return (
    <div className={className}>
      {file && (
        <label htmlFor="Nombre del sonido" className="text-sm lg:text-base">
          {file.fileName} {formatDuration(file.duration)}
        </label>
      )}
      <div className="flex items-center">
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
