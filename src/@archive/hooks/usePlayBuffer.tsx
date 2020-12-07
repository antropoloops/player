import { useCallback, useEffect, useRef, useState } from "react";
import useSimpleAudioContext from "./useSimpleAudioContext";

type Region = {
  offset: number;
  duration: number;
};

type PlayBuffer = {
  playing: boolean;
  start: (time?: number) => void;
  stop: (time?: number) => void;
};

export function usePlayBuffer(
  buffer?: AudioBuffer,
  region?: Region
): [(play: boolean) => void, PlayBuffer] {
  const [playing, setPlay] = useState(false);
  const { start, stop } = useBufferPlayer(buffer, region);

  useEffect(() => {
    if (playing) {
      start();
    } else {
      stop();
    }
  }, [playing, start, stop]);

  useEffect(() => {
    stop();
    setPlay(false);
  }, [buffer, stop]);

  return [setPlay, { playing, start, stop }];
}

function useBufferPlayer(buffer?: AudioBuffer, region?: Region) {
  const ctx = useSimpleAudioContext();
  const playingSample = useRef<AudioBufferSourceNode | null>(null);
  const output = ctx.destination;

  const stop = useCallback(
    (time?: number) => {
      playingSample.current?.stop(time || ctx.currentTime);
    },
    [playingSample, ctx]
  );
  const start = useCallback(
    (time: number = ctx.currentTime) => {
      if (!buffer) return;

      stop(time);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const destination = output || ctx.destination;
      source.connect(destination);
      source.loop = true;
      const startTime = region?.offset || 0;
      const duration = region?.duration || buffer.length - startTime;
      const stopTime = startTime + duration;
      source.loopStart = startTime;
      source.loopEnd = stopTime;
      playingSample.current = source;
      source.start(time, startTime);
    },
    [ctx, buffer, output, region, stop]
  );

  return { start, stop };
}
