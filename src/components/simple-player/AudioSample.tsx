import React, { useCallback, useEffect, useRef, useState } from "react";
import { loadAudio } from "../../lib/active-audio-context";
import {
  IAudioBufferSourceNode,
  IAudioContext,
} from "standardized-audio-context";
import useAudioOutput from "../../hooks/useAudioOutput";
import { ClipStatus4 } from "../../player4";

type Props = {
  url: string;
  status?: ClipStatus4;
  onStateChange?: (ready: boolean) => void;
  onEnded?: () => void;
};

const AudioSample: React.FC<Props> = ({ url, status, onStateChange }) => {
  const { output } = useAudioOutput();
  const [sample, setSample] = useState<Sample | null>(null);
  const playingSample = useRef<IAudioBufferSourceNode<IAudioContext> | null>(
    null
  );

  useEffect(() => {
    loadAudio(url)
      .then(setSample)
      .then(() => onStateChange?.(true));
  }, [url, onStateChange]);

  useEffect(() => {
    return () => {
      playingSample.current?.stop();
    };
  }, []);

  const play = useCallback(
    (time: number) => {
      if (!sample) return;

      const source = sample.context.createBufferSource();
      source.buffer = sample.buffer;
      const destination = output || sample.context.destination;
      source.connect(destination);
      source.loop = true;
      playingSample.current = source;
      source.start(time);
    },
    [sample, output]
  );

  const stop = useCallback(
    (time: number) => {
      playingSample.current?.stop(time);
    },
    [playingSample]
  );

  useEffect(() => {
    if (!status || status.dirty) return;
    if (status.playing) {
      play(status.time);
    } else {
      stop(status.time);
    }
  }, [status, play, stop]);

  return null;
};
export default AudioSample;

type Sample = {
  context: IAudioContext;
  buffer: AudioBuffer;
};
