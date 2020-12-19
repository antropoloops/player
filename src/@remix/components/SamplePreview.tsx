import React from "react";
import { Selection, Track } from "../../models";
import { Waveform } from "../../@sounds/components/Waveform";
import { formatDuration } from "../../@sounds/helpers/timeHelpers";

type Props = {
  className?: string;
  track?: Track;
  sample: Selection;
};

export default function SamplePreview({ className, sample, track }: Props) {
  const file = sample.file || sample.media?.file;

  if (!file) return null;

  const style = track ? { color: track.meta.color } : undefined;

  return (
    <div className={className}>
      <label htmlFor="Nombre del sonido" className="text-xs">
        {file.fileName} {formatDuration(file.duration)}
      </label>
      <div className="mt-1 p-1 bg-gray-darker text-remixes opacity-75">
        <Waveform
          width={100}
          height={10}
          points={file.thumbnail || ""}
          style={style}
        />
      </div>
    </div>
  );
}
