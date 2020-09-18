import React, { useMemo } from "react";
import { AudioResources } from "../../../audioset";
import getSupportedAudioCodecs from "../../../lib/test-audio-codecs";
import { PlayStatus } from "../../simplePlayer";
import AudioSample from "./AudioSample";
import AudioStream from "./AudioStream";

type Props = {
  isStream: boolean;
  audio: AudioResources;
  status: PlayStatus;
  onStateChange: (ready: boolean) => void;
  onEnded?: () => void;
};
const Audio: React.FC<Props> = ({
  isStream,
  audio,
  status,
  onStateChange,
  onEnded,
}) => {
  const Component = isStream ? AudioStream : AudioSample;

  const url = useMemo(() => {
    const codecs = getSupportedAudioCodecs();
    const url =
      (codecs.ogg && audio.ogg) ||
      (codecs.mp3 && audio.mp3) ||
      (codecs.wav && audio.wav) ||
      "";
    return url;
  }, [audio]);

  return (
    <Component
      url={url}
      status={status}
      onStateChange={onStateChange}
      onEnded={onEnded}
    />
  );
};
export default Audio;
