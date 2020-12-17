import React from "react";
import { AudioMetadata } from "../backend";
import { PropertyList } from "../../@core/components";
import { formatTime } from "../helpers/timeHelpers";

type AudioPropertiesProps = {
  className?: string;
  audio: AudioMetadata;
};

export function AudioProperties({ className, audio }: AudioPropertiesProps) {
  return (
    <PropertyList
      className={className}
      keys={["duration", "channels", "sampleRate"]}
      labels={{
        duration: "Duración",
        channels: "Canales",
        sampleRate: "Muestreo",
      }}
      values={{
        channels: audio?.numberOfChannels,
        duration: formatTime(audio?.duration),
        sampleRate: audio?.sampleRate,
      }}
    />
  );
}
