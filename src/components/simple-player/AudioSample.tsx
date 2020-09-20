import React, { useCallback, useEffect, useState } from "react";
import decodeAudioBuffer from "../../lib/decodeAudioBuffer";
import { getActiveAudioContext } from "../../lib/active-audio-context";
import { IAudioContext } from "standardized-audio-context";
import { PlayStatus } from "../../player";
import useAudioOutput from "../../hooks/useAudioOutput";

type Props = {
  url: string;
  status: PlayStatus;
  onStateChange?: (ready: boolean) => void;
  onEnded?: () => void;
};

const AudioSample: React.FC<Props> = ({ url, status, onStateChange }) => {
  const { output } = useAudioOutput();
  const [sample, setSample] = useState<Sample | null>(null);

  useEffect(() => {
    loadAudio(url)
      .then(setSample)
      .then(() => onStateChange?.(true));
  }, [url, onStateChange]);

  const play = useCallback(
    (time: number) => {
      if (!sample) return;

      const source = sample.context.createBufferSource();
      source.buffer = sample.buffer;
      const destination = output || sample.context.destination;
      source.connect(destination);
      source.loop = true;
      source.start(time);

      return () => source.stop();
    },
    [sample, output]
  );

  useEffect(() => {
    if (status?.playing) {
      return play(status.time);
    }
  }, [play, status]);

  return null;
};
export default AudioSample;

type Sample = {
  context: IAudioContext;
  buffer: AudioBuffer;
};

async function loadAudio(url: string) {
  const context = await getActiveAudioContext();
  const response = await fetch(url);
  const buffer = await decodeAudioBuffer(response, context);

  return { context, buffer };
}
